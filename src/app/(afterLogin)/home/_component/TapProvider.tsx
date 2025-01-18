'use client'

import { createContext, useState } from 'react'

export const TapContext = createContext({
    tab: 'rec',
    setTab: (value: 'rec' | 'fol') : void => {}
});

export default function TapProvider({ children }: { children: React.ReactNode }) {

    const [tab, setTab] = useState('rec')

    return <TapContext.Provider value={{ tab, setTab }}>
        {children}
    </TapContext.Provider>;
}