// 방문 시 마다 가이드 효과 표시
(function () {
    // 강조할 요소들 선택 (이미지에서 빨간색 원으로 표시된 부분)
    const searchHint = document.querySelector('#chosungHint .hint-circle');
    const wallpaperBtn = document.getElementById('wallpaperBtn');

    // 은근한 강조 효과 추가
    if (searchHint) searchHint.classList.add('subtle-highlight');
    if (wallpaperBtn) wallpaperBtn.classList.add('subtle-highlight');

    // 사용자가 상호작용하면 강조 효과 제거
    const removeHighlights = () => {
        if (searchHint) searchHint.classList.remove('subtle-highlight');
        if (wallpaperBtn) wallpaperBtn.classList.remove('subtle-highlight');

        // 이벤트 리스너 제거
        window.removeEventListener('click', removeHighlights);
        window.removeEventListener('keydown', removeHighlights);
    };

    // 클릭이나 키 입력 시 효과 제거
    window.addEventListener('click', removeHighlights, { once: true });
    window.addEventListener('keydown', removeHighlights, { once: true });

    // 10초 후 자동으로 제거 (사용자가 아무것도 안 하더라도)
    setTimeout(removeHighlights, 10000);
})();
