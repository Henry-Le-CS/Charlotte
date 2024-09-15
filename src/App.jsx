import './App.css';

// utils
import { useEffect, useRef } from 'react';

// styles
import '$/styles/index.scss';
import ThemeStyles from '$/styles/theme';
import 'react-toastify/dist/ReactToastify.min.css';

// contexts
import { SidebarProvider } from '$/contexts/sidebarContext';
import { ThemeProvider } from 'styled-components';

// hooks
import { useTheme } from '$/contexts/themeContext';
import { useLocation } from 'react-router-dom';

// components
import ScrollToTop from '$/components/ScrollToTop';
import { ToastContainer } from 'react-toastify';

// Router
import RouterController from './router';

const App = () => {
    const appRef = useRef(null);
    const theme = useTheme();
    const path = useLocation().pathname;
    const withSidebar = path !== '/login' && path !== '/404' && path !== '/';

    useEffect(() => {
        appRef.current && appRef.current.scrollTo(0, 0);
    }, []);

    return (
        <SidebarProvider>
            <ThemeProvider theme={{ theme: theme }}>
                <ThemeStyles />
                <ToastContainer theme={theme} autoClose={2000} style={{ padding: '20px' }} />
                <div className={`app ${!withSidebar ? 'fluid' : ''}`} ref={appRef}>
                    <ScrollToTop />
                    <div className="app_content">
                        <RouterController />
                    </div>
                </div>
            </ThemeProvider>
        </SidebarProvider>
    );
};

export default App;
