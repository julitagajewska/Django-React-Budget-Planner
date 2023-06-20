import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

export type ErrorMessagesContextType = {
    categoryError: string,
    setCategoryError: Dispatch<SetStateAction<string>>
}

export const ErrorMessagesContext = createContext<ErrorMessagesContextType | null>(null);

export const ErrorMessagesProvider = ({ children }: PropsWithChildren) => {
    const [categoryError, setCategoryError] = useState<string>('');

    return (
        <ErrorMessagesContext.Provider value={{ categoryError, setCategoryError }}>
            {children}
        </ErrorMessagesContext.Provider>
    );
}