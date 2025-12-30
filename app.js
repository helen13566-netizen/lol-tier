// 상태 변수
let currentChosung = null;
let searchQuery = '';

// 배경화면 이미지 목록
const WALLPAPERS = [
    '럭스.jpg',
    '블리츠.jpg',
    '아리.jpg',
    '아칼리.jpg',
    '애쉬.jpg',
    '조이.jpg',
    '징크스.jpg',
    '티모.jpg',
    '펭구가렌.jpg'
];
let wallpaperListVisible = false;

// 초성 매핑
const CHOSUNG_MAP = {
    'ㄱ': ['가', '까'],
    'ㄴ': ['나'],
    'ㄷ': ['다', '따'],
    'ㄹ': ['라'],
    'ㅁ': ['마'],
    'ㅂ': ['바', '빠'],
    'ㅅ': ['사', '싸'],
    'ㅇ': ['아'],
    'ㅈ': ['자', '짜'],
    'ㅊ': ['차'],
    'ㅋ': ['카'],
    'ㅌ': ['타'],
    'ㅍ': ['파'],
    'ㅎ': ['하']
};

// 초성 추출
// 초성 추출 (낱개 자음 및 완성형 한글 모두 처리)
function getChosung(char) {
    if (!char) return "";
    const chosungs = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const mapping = { 'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ' };

    // 이미 초성인 경우
    if (chosungs.includes(char)) {
        return mapping[char] || char;
    }

    const code = char.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return char; // 한글이 아니면 그대로 반환

    const chosungIndex = Math.floor(code / 588);
    const cho = chosungs[chosungIndex];
    return mapping[cho] || cho;
}

// 문자열 전체를 초성으로 변환
function getFullChosung(str) {
    if (!str) return "";
    return str.split('').map(char => getChosung(char)).join('');
}

// DOM 요소
const chosungGrid = document.getElementById('chosungGrid');
const championListEl = document.getElementById('championList');
const wallpaperBtn = document.getElementById('wallpaperBtn');
const wallpaperListEl = document.getElementById('wallpaperList');
const searchInput = document.getElementById('championSearch');
const searchClear = document.getElementById('searchClear');


// 배경화면 선택 토글
function toggleWallpaperSelection() {
    wallpaperListVisible = !wallpaperListVisible;

    // 버튼 활성화 상태
    wallpaperBtn.classList.toggle('active', wallpaperListVisible);

    // 배경화면 목록 표시/숨김
    if (wallpaperListVisible) {
        renderWallpapers();
        wallpaperListEl.style.display = 'block';
    } else {
        wallpaperListEl.style.display = 'none';
    }
}

// 배경화면 썸네일 그리드 렌더링
function renderWallpapers() {
    const savedWallpaper = localStorage.getItem('selectedWallpaper') || '애쉬.jpg';

    wallpaperListEl.innerHTML = `
        <div class="wallpaper-grid">
            ${WALLPAPERS.map(filename => `
                <div class="wallpaper-item ${filename === savedWallpaper ? 'selected' : ''}" onclick="selectWallpaper('${filename}')">
                    <img src="./배경화면/${filename}" alt="${filename}">
                </div>
            `).join('')}
        </div>
    `;
}

// 배경화면 선택
function selectWallpaper(filename) {
    // localStorage에 저장
    localStorage.setItem('selectedWallpaper', filename);

    // 배경화면 변경
    document.body.style.setProperty('--bg-image', `url('./배경화면/${filename}')`);

    // 선택된 항목 표시 업데이트
    document.querySelectorAll('.wallpaper-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.wallpaper-item').classList.add('selected');
}

// 저장된 배경화면 로드
function loadSavedWallpaper() {
    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
        document.body.style.setProperty('--bg-image', `url('./배경화면/${savedWallpaper}')`);
    }
}



// 티어 순서 정의
const TIER_ORDER = { 'S+': 0, 'S': 1, 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'N/A': 6 };

// 챔피언 필터링 및 티어별 정렬
function filterAndSortChampions(chosung = null, query = '') {
    if (typeof CHAMPION_TIERS === 'undefined') return [];

    let champions = Object.keys(CHAMPION_TIERS);

    // 초성 필터링
    if (chosung) {
        champions = champions.filter(name => {
            const firstChar = name.charAt(0);
            return getChosung(firstChar) === chosung;
        });
    }

    // 텍스트 검색 필터링
    if (query) {
        const lowerQuery = query.toLowerCase();
        const queryChosung = getFullChosung(lowerQuery);
        const hangulOnly = /^[가-힣\s]+$/.test(lowerQuery);
        const isQueryPureChosung = !hangulOnly && /^[ㄱ-ㅎ\s]+$/.test(lowerQuery);

        champions = champions.filter(name => {
            // 한글 이름 매칭
            if (name.toLowerCase().startsWith(lowerQuery)) return true;

            // 영어 이름 매칭
            const enName = CHAMPION_EN[name];
            if (enName && enName.toLowerCase().startsWith(lowerQuery)) return true;

            // 초성 검색 매칭 (검색어가 초성으로만 구성된 경우)
            if (isQueryPureChosung) {
                const nameChosung = getFullChosung(name);
                if (nameChosung.startsWith(queryChosung)) return true;
            }

            return false;
        });
    }

    // 티어별 정렬
    champions.sort((a, b) => {
        const tierA = CHAMPION_TIERS[a] || 'N/A';
        const tierB = CHAMPION_TIERS[b] || 'N/A';
        const tierComparison = TIER_ORDER[tierA] - TIER_ORDER[tierB];

        // 같은 티어면 이름순 정렬
        if (tierComparison === 0) {
            return a.localeCompare(b);
        }
        return tierComparison;
    });

    return champions;
}

// 기존 함수와의 호환성 유지
function filterChampionsByChosung(chosung) {
    return filterAndSortChampions(chosung, '');
}


// 챔피언 한글-영어 매핑 (Riot CDN용)
const CHAMPION_EN = {
    '가렌': 'Garen', '갈리오': 'Galio', '갱플랭크': 'Gangplank', '그라가스': 'Gragas',
    '그레이브즈': 'Graves', '그웬': 'Gwen', '나르': 'Gnar', '나미': 'Nami', '나피리': 'Naafiri',
    '나서스': 'Nasus', '노틸러스': 'Nautilus', '녹턴': 'Nocturne', '누누와 윌럼프': 'Nunu', '니달리': 'Nidalee', '니코': 'Neeko', '닐라': 'Nilah',
    '다리우스': 'Darius', '다이애나': 'Diana', '드레이븐': 'Draven',
    '라이즈': 'Ryze', '라칸': 'Rakan', '람머스': 'Rammus', '럭스': 'Lux',
    '럼블': 'Rumble', '레나타 글라스크': 'Renata', '레넥톤': 'Renekton', '레오나': 'Leona',
    '렉사이': 'RekSai', '렐': 'Rell', '렝가': 'Rengar',
    '루시안': 'Lucian', '룰루': 'Lulu', '르블랑': 'Leblanc', '리븐': 'Riven', '리산드라': 'Lissandra', '리신': 'LeeSin', '릴리아': 'Lillia',
    '마오카이': 'Maokai', '마스터 이': 'MasterYi', '말자하': 'Malzahar', '말파이트': 'Malphite', '멜': 'Mel',
    '모데카이저': 'Mordekaiser', '모르가나': 'Morgana', '문도 박사': 'DrMundo', '밀리오': 'Milio', '미스 포츈': 'MissFortune',
    '바드': 'Bard', '바루스': 'Varus', '바이': 'Vi', '베이가': 'Veigar', '베인': 'Vayne', '벨베스': 'Belveth', '벨코즈': 'Velkoz', '벡스': 'Vex',
    '볼리베어': 'Volibear', '브라이어': 'Briar', '브라움': 'Braum', '브랜드': 'Brand', '블라디미르': 'Vladimir',
    '블리츠크랭크': 'Blitzcrank', '비에고': 'Viego', '빅토르': 'Viktor',
    '뽀삐': 'Poppy',
    '사미라': 'Samira', '사이온': 'Sion', '사일러스': 'Sylas', '샤코': 'Shaco', '스몰더': 'Smolder',
    '세나': 'Senna', '세라핀': 'Seraphine', '세주아니': 'Sejuani', '세트': 'Sett', '소나': 'Sona', '소라카': 'Soraka',
    '쉔': 'Shen', '쉬바나': 'Shyvana', '스웨인': 'Swain', '스카너': 'Skarner', '승리의 여신': 'Aurora',
    '시비르': 'Sivir', '신드라': 'Syndra', '신지드': 'Singed', '신짜오': 'XinZhao', '쓰레쉬': 'Thresh',
    '아리': 'Ahri', '아무무': 'Amumu', '아우렐리온 솔': 'AurelionSol', '아이번': 'Ivern', '아지르': 'Azir', '아칼리': 'Akali', '아크샨': 'Akshan',
    '아트록스': 'Aatrox', '아펠리오스': 'Aphelios', '알리스타': 'Alistar', '암베사': 'Ambessa', '애니': 'Annie', '애니비아': 'Anivia',
    '애쉬': 'Ashe', '야스오': 'Yasuo', '오로라': 'Aurora', '에코': 'Ekko', '엘리스': 'Elise',
    '오공': 'MonkeyKing', '오른': 'Ornn', '오리아나': 'Orianna', '올라프': 'Olaf',
    '요네': 'Yone', '요릭': 'Yorick', '우디르': 'Udyr', '우르곳': 'Urgot', '워윅': 'Warwick',
    '유나라': 'Yunara', '유미': 'Yuumi',
    '이렐리아': 'Irelia', '이블린': 'Evelynn', '이즈리얼': 'Ezreal', '일라오이': 'Illaoi',
    '자르반 4세': 'JarvanIV', '자야': 'Xayah', '자이라': 'Zyra', '자크': 'Zac', '잔나': 'Janna', '잭스': 'Jax',
    '제드': 'Zed', '제라스': 'Xerath', '제리': 'Zeri', '제이스': 'Jayce', '조이': 'Zoe', '직스': 'Ziggs', '진': 'Jhin', '질리언': 'Zilean',
    '징크스': 'Jinx',
    '초가스': 'Chogath', '카르마': 'Karma', '카밀': 'Camille', '카사딘': 'Kassadin', '카서스': 'Karthus', '카시오페아': 'Cassiopeia',
    '카이사': 'Kaisa', '카직스': 'Khazix', '카타리나': 'Katarina', '칼리스타': 'Kalista', '케넨': 'Kennen', '크산테': 'KSante',
    '케이틀린': 'Caitlyn', '케일': 'Kayle', '케인': 'Kayn', '코그모': 'KogMaw', '코르키': 'Corki', '킨드레드': 'Kindred',
    '퀸': 'Quinn', '키아나': 'Qiyana', '클레드': 'Kled',
    '타릭': 'Taric', '탈론': 'Talon', '탈리야': 'Taliyah', '탐 켄치': 'TahmKench', '트런들': 'Trundle', '트리스타나': 'Tristana',
    '트린다미어': 'Tryndamere', '트위스티드 페이트': 'TwistedFate', '트위치': 'Twitch', '티모': 'Teemo',
    '파이크': 'Pyke', '판테온': 'Pantheon', '피들스틱': 'Fiddlesticks', '피오라': 'Fiora', '피즈': 'Fizz',
    '하이머딩거': 'Heimerdinger', '헤카림': 'Hecarim', '흐웨이': 'Hwei'
};

// 챔피언 URL 슬러그 매핑 (METAsrc용)
const CHAMPION_SLUG = {
    '가렌': 'garen', '갈리오': 'galio', '갱플랭크': 'gangplank', '그라가스': 'gragas',
    '그레이브즈': 'graves', '그웬': 'gwen', '나르': 'gnar', '나미': 'nami', '나피리': 'naafiri',
    '나서스': 'nasus', '노틸러스': 'nautilus', '녹턴': 'nocturne', '누누와 윌럼프': 'nunu', '니달리': 'nidalee', '니코': 'neeko', '닐라': 'nilah',
    '다리우스': 'darius', '다이애나': 'diana', '드레이븐': 'draven',
    '라이즈': 'ryze', '라칸': 'rakan', '람머스': 'rammus', '럭스': 'lux',
    '럼블': 'rumble', '레나타 글라스크': 'renata-glasc', '레넥톤': 'renekton', '레오나': 'leona',
    '렉사이': 'reksai', '렐': 'rell', '렝가': 'rengar',
    '루시안': 'lucian', '룰루': 'lulu', '르블랑': 'leblanc', '리븐': 'riven', '리산드라': 'lissandra', '리신': 'lee-sin', '릴리아': 'lillia',
    '마오카이': 'maokai', '마스터 이': 'master-yi', '말자하': 'malzahar', '말파이트': 'malphite', '멜': 'mel',
    '모데카이저': 'mordekaiser', '모르가나': 'morgana', '문도 박사': 'dr-mundo', '밀리오': 'milio', '미스 포츈': 'miss-fortune',
    '바드': 'bard', '바루스': 'varus', '바이': 'vi', '베이가': 'veigar', '베인': 'vayne', '벨베스': 'belveth', '벨코즈': 'velkoz', '벡스': 'vex',
    '볼리베어': 'volibear', '브라이어': 'briar', '브라움': 'braum', '브랜드': 'brand', '블라디미르': 'vladimir',
    '블리츠크랭크': 'blitzcrank', '비에고': 'viego', '빅토르': 'viktor',
    '뽀삐': 'poppy',
    '사미라': 'samira', '사이온': 'sion', '사일러스': 'sylas', '샤코': 'shaco', '스몰더': 'smolder',
    '세나': 'senna', '세라핀': 'seraphine', '세주아니': 'sejuani', '세트': 'sett', '소나': 'sona', '소라카': 'soraka',
    '쉔': 'shen', '쉬바나': 'shyvana', '스웨인': 'swain', '스카너': 'skarner', '승리의 여신': 'aurora',
    '시비르': 'sivir', '신드라': 'syndra', '신지드': 'singed', '신짜오': 'xin-zhao', '쓰레쉬': 'thresh',
    '아리': 'ahri', '아무무': 'amumu', '아우렐리온 솔': 'aurelion-sol', '아이번': 'ivern', '아지르': 'azir', '아칼리': 'akali', '아크샨': 'akshan',
    '아트록스': 'aatrox', '아펠리오스': 'aphelios', '알리스타': 'alistar', '암베사': 'ambessa', '애니': 'annie', '애니비아': 'anivia',
    '애쉬': 'ashe', '야스오': 'yasuo', '오로라': 'aurora', '에코': 'ekko', '엘리스': 'elise',
    '오공': 'wukong', '오른': 'ornn', '오리아나': 'orianna', '올라프': 'olaf',
    '요네': 'yone', '요릭': 'yorick', '우디르': 'udyr', '우르곳': 'urgot', '워윅': 'warwick',
    '유나라': 'yunara', '유미': 'yuumi',
    '이렐리아': 'irelia', '이블린': 'evelynn', '이즈리얼': 'ezreal', '일라오이': 'illaoi',
    '자르반 4세': 'jarvan', '자야': 'xayah', '자이라': 'zyra', '자크': 'zac', '잔나': 'janna', '잭스': 'jax',
    '제드': 'zed', '제라스': 'xerath', '제리': 'zeri', '제이스': 'jayce', '조이': 'zoe', '직스': 'ziggs', '진': 'jhin', '질리언': 'zilean',
    '징크스': 'jinx',
    '초가스': 'chogath', '카르마': 'karma', '카밀': 'camille', '카사딘': 'kassadin', '카서스': 'karthus', '카시오페아': 'cassiopeia',
    '카이사': 'kaisa', '카직스': 'khazix', '카타리나': 'katarina', '칼리스타': 'kalista', '케넨': 'kennen', '크산테': 'ksante',
    '케이틀린': 'caitlyn', '케일': 'kayle', '케인': 'kayn', '코그모': 'kogmaw', '코르키': 'corki', '킨드레드': 'kindred',
    '퀸': 'quinn', '키아나': 'qiyana', '클레드': 'kled',
    '타릭': 'taric', '탈론': 'talon', '탈리야': 'taliyah', '탐 켄치': 'tahm-kench', '트런들': 'trundle', '트리스타나': 'tristana',
    '트린다미어': 'tryndamere', '트위스티드 페이트': 'twisted-fate', '트위치': 'twitch', '티모': 'teemo',
    '파이크': 'pyke', '판테온': 'pantheon', '피들스틱': 'fiddlesticks', '피오라': 'fiora', '피즈': 'fizz',
    '하이머딩거': 'heimerdinger', '헤카림': 'hecarim', '흐웨이': 'hwei'
};

// 챔피언 이미지 URL 가져오기
function getChampionImageUrl(korName) {
    const enName = CHAMPION_EN[korName] || korName;
    return `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${enName}.png`;
}

// 챔피언 METAsrc URL 가져오기
function getChampionMetaSrcUrl(korName) {
    const slug = CHAMPION_SLUG[korName] || korName.toLowerCase();
    return `https://cloud.metasrc.com/ko/lol/mayhem/build/${slug}`;
}

// 초성 선택 (토글 기능 포함)
function selectChosung(chosung) {
    // 같은 초성을 다시 누르면 목록 숨기기
    if (currentChosung === chosung) {
        currentChosung = null;
        document.querySelectorAll('.chosung-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        championListEl.style.display = 'none';
        return;
    }

    currentChosung = chosung;

    // 버튼 활성화 상태
    document.querySelectorAll('.chosung-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.chosung === chosung);
    });

    // 챔피언 목록 표시
    renderChampionList();
}

// 챔피언 목록 렌더링
function renderChampionList() {
    const champions = filterAndSortChampions(currentChosung, searchQuery);

    if (champions.length === 0) {
        championListEl.style.display = searchQuery ? 'block' : 'none';
        if (searchQuery) {
            championListEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <p>"${searchQuery}"에 대한<br>검색 결과가 없습니다</p>
                </div>
            `;
        }
        return;
    }

    championListEl.style.display = 'block';
    championListEl.innerHTML = `
        <div class="champion-buttons">
            <div class="champion-hint" style="margin: 0;">
                <span class="hint-circle">챔피언을 클릭하여 증강 보기</span>
            </div>
            ${champions.map(c => {
        const tier = CHAMPION_TIERS[c] || 'N/A';
        const tierClass = `tier-${tier.toLowerCase().replace('+', 'plus')}`;

        return `
                    <button class="champion-select-btn" data-champion="${c}" data-url="${getChampionMetaSrcUrl(c)}">
                        <img class="champion-thumb" src="${getChampionImageUrl(c)}" alt="${c}" onerror="this.style.display='none'">
                        <span class="champion-name-wrapper">
                            <span class="champion-name">${c}</span>
                            <span class="tier-badge ${tierClass}">${tier}</span>
                        </span>
                    </button>
                `;
    }).join('')}
        </div>
    `;

    // 챔피언 버튼 이벤트 - 클릭 시 바로 URL 열기
    document.querySelectorAll('.champion-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open(btn.dataset.url, '_blank');
        });
    });
}




// 이벤트 리스너
document.querySelectorAll('.chosung-btn').forEach(btn => {
    btn.addEventListener('click', () => selectChosung(btn.dataset.chosung));
});

// 배경화면 버튼 이벤트
wallpaperBtn.addEventListener('click', toggleWallpaperSelection);

// 검색 입력 이벤트
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();

    // 지우기 버튼 표시/숨김
    searchClear.style.display = searchQuery ? 'flex' : 'none';

    // 검색 중이면 초성 선택 해제
    if (searchQuery) {
        currentChosung = null;
        document.querySelectorAll('.chosung-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    // 검색 결과 표시
    if (searchQuery) {
        renderChampionList();
    } else if (!currentChosung) {
        championListEl.style.display = 'none';
    }
});

// 검색 지우기 버튼 이벤트
searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.style.display = 'none';
    championListEl.style.display = 'none';
    searchInput.focus();
});

// 초기화
loadData();
loadSavedWallpaper();
