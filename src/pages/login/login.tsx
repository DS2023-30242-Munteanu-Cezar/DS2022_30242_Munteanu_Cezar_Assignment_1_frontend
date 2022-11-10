import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Header from "../../components/header/sd-header";
import Icon from "../../components/icon/icon";
import { LoginContext } from "../../contexts/login_context";
import { LoginContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import "./login.scss";


const Login = (): JSX.Element =>{
    const {loginData,setLoginData} = useContext<LoginContextType>(LoginContext);
    const [passwordType, setPasswordType] = useState<string>("password");
    const [iconType, setIconType] = useState<string>("eye");
    
    
    const navigate: NavigateFunction = useNavigate();
    const [creditentials, setCreditentials] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });

    async function handleLogin(event: any){
        event.preventDefault();
        const helperLogin = JSON.stringify(creditentials);        
        const aux = await getAxiosInstanceCustom().post("/auth/login", helperLogin);
        if(aux.data != null){

            const aa:any = jwtDecode(aux.data.accesToken);
            const a: any = aa.sub.split(",", 2);
            loginData.role = a[1];
            loginData.username = a[0];
            setLoginData(loginData);
            localStorage.setItem("accesToken", aux.data.accesToken);
            navigate("/users");
        }
        
        
    }

    const togglePassword = (event: any) => {
        event.preventDefault();
        if (passwordType === "password") {
          setPasswordType("text");
          setIconType("eye_slash");
          return;
        }
        setPasswordType("password");
        setIconType("eye");
      };

    return <>
        <div className="login_body">
            <Header isLogged={false}></Header>
            <form className="login_form">
                <h1 className="login_header">Log in</h1>
                <label className="username_label">
                    Username:
                    <input className="username_input" type="text" placeholder="Type here your username" onChange={(event : any) => {
                        creditentials.username = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                </label>
                <label className="password_label">
                    Password:
                    <div className="eye_div">
                    <input className="password_input" type={passwordType} placeholder="Type here your password" onChange={(event: any) => {
                        creditentials.password = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                    <Icon type={iconType} onClick={togglePassword}/>
                    </div>
                </label>
                <Button type="main" name="Login" onClick={handleLogin}></Button>
            </form>
        </div>

    </>;
}

export default Login;