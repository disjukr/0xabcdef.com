import React, { useState, createContext, useEffect } from 'react';
import { joinProvider } from 'join-react-context';

import { arr0 } from '../../util';
import './index.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    const [layoutState, setLayoutState] = useState(getLayoutState);
    useEffect(() => {
        const onresize = () => setLayoutState(getLayoutState());
        window.addEventListener('resize', onresize);
        return () => window.removeEventListener('resize', onresize);
    }, arr0);
    const context = [layoutState];
    return <Provider value={context}>{children}</Provider>;
};

const getLayoutState = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export const layoutContext = createContext({
    width: 640,
    height: 1280,
});

const Provider = joinProvider([layoutContext]);
