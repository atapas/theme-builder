import { useEffect, useState } from 'react';
import * as themes from './schema.json';

export const useTheme = () => {
    const [theme, setTheme] = useState(themes.data.light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(JSON.parse(localTheme)) : setTheme(themes.data.light);
        setThemeLoaded(true);
    }, []);
    
    return { theme, themeLoaded, setMode };
};
