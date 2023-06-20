import React, { FormEvent, PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type WalletContextType = {

}

export type WalletType = {
    [x: string]: any;
    id: number,
    name: string,
    categories: CategoryType[],
    owners: UserType[],
    balance: number
}

export type CategoryType = {

}

export type UserType = {

}

export const Walletcontext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: PropsWithChildren) => {
    const [wallet, setWallet] = useState();


}