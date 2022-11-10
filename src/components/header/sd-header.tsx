import React, { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/login_context";
import { LoginContextType, LoginType } from "../../types/context_types";
import Icon from "../icon/icon";
import "./sd-header.scss";

interface HeaderComponent {
    isAdmin?: boolean;
    isLogged?: boolean;
}

const Header: React.FC<HeaderComponent> = (props: HeaderComponent):JSX.Element =>{
    const {setLoginData} = useContext<LoginContextType>(LoginContext);

    const navigate: NavigateFunction = useNavigate();

    const logOut = (event: any) => {
        event.preventDefault();
        const nonUser: LoginType = {username: "", role: ""};
        setLoginData(nonUser);
        localStorage.clear();
        navigate("/");
    }
    
    return <>
        <div className="header_main">
            <div className="header_options">
                <Icon type="utcn" onClick={() => navigate("/devices")}></Icon>
                {
                    props.isLogged?
                    <>
                        <p className="header_user" onClick={() => navigate("/devices")}>DEVICES</p>
                        <p className="header_user" onClick={() => navigate("/measurements")}>MEASUREMENTS</p>
                    </>
                    : <>
                    <p className="header_user" onClick={() => navigate("/")}>LOG IN</p>
                    <p className="header_user" onClick={ () => navigate("/register")}>REGISTER</p>
                    </>

                }
                {props.isAdmin ?
                <p className="header_admin" onClick={() =>{
                    navigate("/users");
                }}>USERS</p>
                : <></>
                }
            </div>

            {props.isLogged?
            <div className="header_logut">
                <p className="header_user" onClick={logOut}>LOG OUT</p>
            </div>
            :<></>}
        </div>
    </>;
}

export default Header;