import React, { createContext, useState, FC } from "react";
import { UserType, UsersContextType, User} from "../types/context_types";
import getAxiosInstanceCustom from "../utils/axios_serv";
export const UsersContext = createContext<UsersContextType>({
    users: [],
    setUsers: () => {} ,
    getUsers: ()=> {},
});

const UsersProvider:  FC<{children: React.ReactNode}> = ({ children }) =>{
    const [users, setUsers] = useState<UserType[]>([]);
    const myData: User[] = [];
    async function getUsers() {
        const response = await getAxiosInstanceCustom().get("/users");
        
        for(let i = 0 ; i < response.data.length; i++){
            myData[i] = response.data[i];
        }
    
        return myData;
    }

    return <UsersContext.Provider value={{users, setUsers, getUsers}}>
        {children}
    </UsersContext.Provider>
}

export default UsersProvider;