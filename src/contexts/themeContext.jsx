import { savePreferences, setAppHeight, stopTransition } from '$/utils/themeUtils';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({children}) => {
    const page = document.documentElement;
    const browserTheme = window.matchMedia('(prefers-color-scheme: light)');
    const persisted = JSON.parse(localStorage.getItem('preferences') || '{}');
    const [theme, setTheme] = useState(persisted && persisted.theme ?  persisted.theme : (browserTheme.matches ? 'light' : 'dark'));

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        stopTransition(page);
    }

    useEffect(() => {
        page.dataset.ratio = `${window.devicePixelRatio}`;
        setAppHeight(page);

        window.addEventListener('resize', () => setAppHeight(page));

        return () => {
            window.removeEventListener('resize', () => setAppHeight(page));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        savePreferences(theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        const handleMediaChange = (event) => {
            event.matches ? setTheme('light') : setTheme('dark');
            stopTransition(page);
            savePreferences(theme);
        };

        mediaQuery.addEventListener('change', handleMediaChange);

        page.classList.toggle('dark', theme === 'dark');

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useTheme = () => useContext(ThemeContext);
