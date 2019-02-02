import React, { useState, createContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { joinProvider } from 'join-react-context';

import { arr0 } from '../../util';
import './index.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    const [layoutState, setLayoutState] = useState(getLayoutState());
    useEffect(() => {
        const onresize = () => setLayoutState(getLayoutState());
        window.addEventListener('resize', onresize);
        return () => window.removeEventListener('resize', onresize);
    }, arr0);
    const context = [layoutState];
    return (
        <Provider value={context}>
            <Helmet>
                <title>JongChan Choi</title>
            </Helmet>
            {children}
        </Provider>
    );
};

const initialLayoutState = {
    width: 640,
    height: 1280,
};

const getLayoutState = () =>
    typeof window === 'undefined'
        ? initialLayoutState
        : {
              width: window.innerWidth,
              height: window.innerHeight,
          };

export const layoutContext = createContext(initialLayoutState);

const Provider = joinProvider([layoutContext]);
