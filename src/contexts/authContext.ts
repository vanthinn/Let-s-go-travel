import React, { useContext } from 'react';
import { IUser } from '../interfaces/user';


export interface ContextValue {
    user: IUser | undefined;
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
}
const AuthContext = React.createContext<ContextValue | undefined>(undefined);

export const useAuthContext = (): ContextValue => {
    const context = useContext(AuthContext);

    if (context == null) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export default AuthContext;
