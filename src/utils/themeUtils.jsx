// themeUtils.js
export const stopTransition = (page) => {
    page.classList.add('no-transition');
    setTimeout(() => page.classList.remove('no-transition'), 100);
}

export const savePreferences = (theme) => {
    localStorage.setItem('preferences', JSON.stringify({theme}));
}

export const setAppHeight = (page) => {
    page.style.setProperty('--app-height', `${window.innerHeight}px`);
}
