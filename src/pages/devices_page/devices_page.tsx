import Header from "../../components/header/sd-header";
import { DeviceContextType, LoginContextType} from "../../types/context_types";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/login_context";
import { DeviceContext } from "../../contexts/device_context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import "./device_page.scss";
import Icon from "../../components/icon/icon";
import DeviceModal from "../../components/modal/device_modal";
import SocketMessage from "../../components/socket/socketMsg";
import ChatRoom from "../../components/socket/ChatRoom";


const DevicesPage = () =>{
    const {loginData, setLoginData, getLogin} = useContext<LoginContextType>(LoginContext);
    const {devices} = useContext<DeviceContextType>(DeviceContext);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    useEffect(function verifyFetch(){
        setLoginData(getLogin);
        if(!sessionStorage.getItem("accesToken")){
            navigate("/");
        }
    },[]);

    const isAdmin = () =>{
        if(loginData.role === "ADMIN"){
            return true;
        }
        return false;
    }

    const open = () =>{
        setOpenModal(!openModal);
    }


    return <>
        <div className="devices_main">
            <Header isLogged={true} isAdmin= {isAdmin()}></Header>
            <div className="devices_body">
                {devices.map((device, key) => {
                    if(isAdmin()){
                        key++;
                        return <Card key={key} type="device" obj = {device} isAdmin={isAdmin()}/>
                    }
                    else{
                        if(device.userUsername === loginData.username){
                            key++;
                            return <Card key={key} type="device" obj = {device} isAdmin={isAdmin()}/>
                        }
                        return null;
                    }
                })}
                {openModal?
                <DeviceModal type="add"/>
                : <></>
                }
                {isAdmin()?
                <Icon type="plus" onClick={open}></Icon>
                : <></>}
            </div>
            <div><SocketMessage username={loginData.username}></SocketMessage></div>
        </div>

    </>;
}

export default DevicesPage;