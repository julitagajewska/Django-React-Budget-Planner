import React, { FormEvent, PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type SidebarLinkContextType = {
    active: string,
    setActive: (active: string) => void
}

export const SidebarLinkContext = createContext<SidebarLinkContextType | null>(null);

export const SidebarLinkProvider = ({ children }: PropsWithChildren) => {
    const [active, setActive] = useState<string>('');

    return (
        <SidebarLinkContext.Provider value={{ active, setActive }}>
            {children}
        </SidebarLinkContext.Provider>
    );
}