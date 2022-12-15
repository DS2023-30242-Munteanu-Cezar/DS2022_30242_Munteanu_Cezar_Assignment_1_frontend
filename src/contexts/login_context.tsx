import React, { createContext, useState, FC } from "react";
import { LoginContextType, LoginType } from "../types/context_types";
import jwtDecode from "jwt-decode";

export const LoginContext = createContext<LoginContextType>({
    loginData: {username: "", role: ""},
    setLoginData: () => {},
    getLogin: () => {}
});

const LoginProvider: FC<{children: React.ReactNode}> = ({ children }) => {
    const [loginData, setLoginData] = useState<LoginType>({
        username: "",
        role: "",
    });

    const getLogin = () =>{
        const accesToken: any = sessionStorage.getItem("accesToken");
        const myLoginData: any = {username: "", role: ""};

        if(accesToken){
            let myToken: any = jwtDecode(accesToken);
            myToken = myToken.sub.split(",", 2);
            myLoginData.role = myToken[1];
            myLoginData.username = myToken[0];

            return myLoginData;
        }
        return myLoginData;
    }

    return <LoginContext.Provider value={{loginData, setLoginData, getLogin}}>
            {children}
            </LoginContext.Provider>
}

export default LoginProvider;