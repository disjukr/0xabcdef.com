import React, { useState, createContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { joinProvider } from 'join-react-context';
import { Transition, TransitionGroup } from 'react-transition-group';

import { arr0 } from '../../util';
import './index.module.scss';
import { TransitionStatus } from 'react-transition-group/Transition';

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
            <TransitionGroup component={null}>
                <Transition key={location.pathname} timeout={300}>
                    {state => (
                        <pageTransitionStateContext.Provider value={state}>
                            {children}
                        </pageTransitionStateContext.Provider>
                    )}
                </Transition>
            </TransitionGroup>
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

export const pageTransitionStateContext = createContext<TransitionStatus>('entered');

const Provider = joinProvider([layoutContext]);
