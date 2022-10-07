import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase'

//initialize the context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // save the current user
    const [currentUser, setCurrentUser] = useState({})
    
    //authentication state checker
    const unsub = useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        //cleanup function to prevent memory leaking?
        return () => {
            unsub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}