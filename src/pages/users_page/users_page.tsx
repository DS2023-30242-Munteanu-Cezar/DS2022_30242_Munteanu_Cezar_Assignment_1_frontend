import { useContext, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Header from "../../components/header/sd-header";
import { LoginContext } from "../../contexts/login_context";
import { UsersContext } from "../../contexts/users_context";
import { LoginContextType, UsersContextType } from "../../types/context_types";
import "./users_page.scss";

const UsersPage = () =>{
    const {loginData, setLoginData, getLogin} = useContext<LoginContextType>(LoginContext);
    const {users} = useContext<UsersContextType>(UsersContext);

    const navigate: NavigateFunction = useNavigate();

    useEffect(function verifyFetch(){
        setLoginData(getLogin);
        if(!localStorage.getItem("accesToken")){
            navigate("/");
        }
        if(loginData.role !== "ADMIN"){
            navigate("/devices");
        }
    },[]);

    const isAdmin = () =>{
        if(loginData.role === "ADMIN"){
            return true;
        }
        return false;
    }

    return <>
        <div className="users_main">
            <Header isAdmin= {isAdmin()} isLogged = {true}></Header>
            <div className="users_body">
                {users.map( (user, index) => {
                    return <Card type="user" obj={{username: user.username, email: user.email, role: user.roleCode}} isAdmin={isAdmin()}></Card>
                })}
            </div>
        </div>
    </>;
}

export default UsersPage;