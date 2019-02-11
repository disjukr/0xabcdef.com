import React, { useState, useContext, createContext } from 'react';

interface DocStateProps {
    initialState: any;
}
export const DocState: React.FC<DocStateProps> = ({ children, initialState }) => {
    const state = useState(initialState);
    return <docStateContext.Provider value={state}>{children}</docStateContext.Provider>;
};

export const docStateContext = createContext<any>(null);

export const useDocState = () => useContext(docStateContext);
