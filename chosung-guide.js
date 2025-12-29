// 첫 방문 안내 기능
(function () {
    const FIRST_VISIT_KEY = 'chosung_guide_shown';
    const chosungSection = document.querySelector('.chosung-section');
    const chosungHint = document.getElementById('chosungHint');

    // 첫 방문 체크
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);

    if (!hasVisited && chosungSection) {
        // 첫 방문 시 펄스 애니메이션 추가
        chosungSection.classList.add('first-visit');

        // 초성 버튼 클릭 시 애니메이션 제거 및 방문 기록
        const chosungButtons = document.querySelectorAll('.chosung-btn');
        chosungButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                chosungSection.classList.remove('first-visit');
                localStorage.setItem(FIRST_VISIT_KEY, 'true');
            }, { once: true });
        });

        // 6초 후 자동으로 애니메이션 제거
        setTimeout(() => {
            chosungSection.classList.remove('first-visit');
        }, 6000);
    }
})();
