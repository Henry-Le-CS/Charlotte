import { useContext } from 'react';
import SidebarContext from './sidebarContext';

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }

    return context;
};