import useScrollLock from '$/hooks/useScrollLock';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext(undefined);

export const SidebarProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const setIsLocked = useScrollLock();

    // close sidebar when route changes
    useEffect(() => {
        setOpen(false);
    }, [location]);

    useEffect(() => {
        if (open) {
            setIsLocked(true);
        } else {
            setIsLocked(false);
        }

        return () => {
            setIsLocked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <SidebarContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarContext.Provider>
    );
}

SidebarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarContext;
