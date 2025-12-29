// 챔피언 목록 첫 방문 안내 기능
(function () {
    // 원래 selectChosung 함수를 저장
    const originalSelectChosung = window.selectChosung;

    // selectChosung 함수 래핑
    window.selectChosung = function (chosung) {
        // 원래 함수 호출
        originalSelectChosung(chosung);

        // 챔피언 목록이 표시된 후 첫 방문 효과 추가
        setTimeout(() => {
            const championListEl = document.getElementById('championList');
            const championListShown = localStorage.getItem('champion_list_shown');

            if (!championListShown && championListEl && championListEl.style.display === 'block') {
                championListEl.classList.add('first-visit');
                localStorage.setItem('champion_list_shown', 'true');

                // 6초 후 자동으로 애니메이션 제거
                setTimeout(() => {
                    championListEl.classList.remove('first-visit');
                }, 6000);
            }
        }, 100);
    };
})();
