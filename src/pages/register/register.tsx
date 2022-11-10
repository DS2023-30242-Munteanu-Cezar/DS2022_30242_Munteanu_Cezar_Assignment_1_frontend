import { useContext,useState } from "react";
import Button from "../../components/button/button";
import Header from "../../components/header/sd-header";
import { UsersContext } from "../../contexts/users_context";
import { UsersContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import "./register.scss";


const Register = (): JSX.Element => {
    const {users, setUsers} = useContext<UsersContextType>(UsersContext);
    const [creditentials, setCreditentials] = useState<{ email: string, username: string; password: string, confirmedPassword: string }>({
        email: "",
        username: "",
        password: "",
        confirmedPassword: ""
    });
    const [myDispay, setMyDisplay] = useState<string>("none");
    const [registerText, setRegisterText] = useState<string>("");

    async function handleRegister(event: any) {
        event.preventDefault();

        if(creditentials.email !== "" && creditentials.username !== "" && creditentials.confirmedPassword !== "" && creditentials.password !== ""){

            let verified = 0;
            if(creditentials.email && creditentials.username){
                users.map(user => {
                    if(user.email === creditentials.email || user.username === creditentials.username){
                        verified++;
                    }
                })
            }

            if(creditentials.password !== creditentials.confirmedPassword){
                setRegisterText ("Passwords are different!");
            }

            if(verified !== 0){
                setRegisterText ("Email or userame already exist! Please use other!");
            }

            if(verified === 0 && creditentials.password === creditentials.confirmedPassword){
                const myUser= {username: creditentials.username, email : creditentials.email, password: creditentials.password, roleCode: "USER"};
                console.log("myUser", myUser);
                users.push(myUser);
                setUsers(users);
                await getAxiosInstanceCustom().post("/users", JSON.stringify({username: creditentials.username, email : creditentials.email, password: creditentials.password, roleCode: "USER"}));
                setRegisterText ("Account created!");
            }
            setMyDisplay("flex");
        }
    }

    return <>
        <div className="register_body">
            <Header isLogged = {false}/>
            <form className="register_form">
                <h1 className="register_header">Create an account here!</h1>
                <label className="email_label">
                    Email:
                    <input className="username_input" type="email" placeholder="Type an email" onClick={(event: any) => {
                        creditentials.email = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                </label>
                <label className="username_label">
                    Username:
                    <input className="username_input" type="text" placeholder="Type an username" onClick={(event: any) => {
                        creditentials.username = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                </label>
                <label className="username_label">
                    Password:
                    <input className="password_input" type = "password" placeholder="Type a password" onClick={(event: any) => {
                        creditentials.password = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                </label>
                <label className="username_label">
                    Confirm password:
                    <input className="password_input" type = "password" placeholder="Type a password" onClick={(event: any) => {
                        creditentials.confirmedPassword = event.target.value;
                        setCreditentials(creditentials);
                    }}></input>
                </label>
                <Button name="Register" onClick={handleRegister}></Button>
                <p className="register_text" style={{display: myDispay}}>{registerText}</p>
            </form>
        </div>
    </>;
}

export default Register;