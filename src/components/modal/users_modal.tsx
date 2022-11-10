import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/users_context";
import { UsersContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import Button from "../button/button";
import Icon from "../icon/icon";
import "./user_modal.scss";

interface UserModalComponenet{
    obj: any;
}

const UserModal = (props: UserModalComponenet) => {
    const [updateInfo, setUpdateInfo] = useState({email: "", password: ""});
    const {users, setUsers} = useContext<UsersContextType>(UsersContext);
    const [display, setDispay] = useState<string>("flex");
    const navigate: NavigateFunction = useNavigate();
    
    async function handleUpdate(event:any) {
        event.preventDefault();
        
        let choose = 0;

            users.map((user) => {
                if(user.username === props.obj.username){
                    if(updateInfo.email !== "" && updateInfo.password !== "" ){
                        user.email = updateInfo.email;
                        user.password = updateInfo.password;
                        choose = 1;
                    }
                    if(updateInfo.email !== "" && updateInfo.password === ""){
                        user.email = updateInfo.email;
                        choose = 2;
                    }
                    if(updateInfo.email === "" && updateInfo.password !== ""){
                        user.email = updateInfo.email;
                        choose = 3;
                    }
                }
            })
            setUsers(users);
            
            if(choose === 1){
                await getAxiosInstanceCustom().post("/users/update", JSON.stringify({username: props.obj.username, password: updateInfo.password, email: updateInfo.email, roleCode: props.obj.role}));
            }
            else{
                if(choose === 2){
                    await getAxiosInstanceCustom().post("/users/update", JSON.stringify({username: props.obj.username, password: props.obj.password, email: updateInfo.email, roleCode: props.obj.role}));
                }
                else{
                    await getAxiosInstanceCustom().post("/users/update", JSON.stringify({username: props.obj.username, password: updateInfo.password, email: props.obj.email, roleCode: props.obj.role}));
                }
            }
            
            close();
            navigate("/users");
    }

    const close = () =>{
        setDispay("none");
    }

    return <>
        <div className="body_modal" style={{display: display}}>
            <div className="user_modal">
                <Icon type="x" onClick={close}/>
                <form className="user_modal_form">
                    <label className="modal_label">
                        New email:
                        <input className="modal_input" type="email" onChange={(event : any) =>{
                            updateInfo.email = event?.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    <label className="modal_label">
                        New password:
                        <input className="modal_input" type="password" onChange={(event : any) =>{
                            updateInfo.password = event?.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                </form>
                <Button name="Update" onClick={handleUpdate}></Button>
            </div>
        </div>
    </>;
}

export default UserModal;