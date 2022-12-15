import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import Header from "../../components/header/sd-header";
import Icon from "../../components/icon/icon";
import MeasurementsModal from "../../components/modal/measurements_modal";
import { LoginContext } from "../../contexts/login_context";
import { MeasurementsContext } from "../../contexts/measurement_context";
import { LoginContextType, MeasurementsContextType } from "../../types/context_types";
import "./measurements_page.scss";

const MeasurementsPage = () =>{
    const {loginData, setLoginData, getLogin} = useContext<LoginContextType>(LoginContext);
    const {measurements} = useContext<MeasurementsContextType>(MeasurementsContext);
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
        <div className="measurements_main">
            <Header isLogged={true} isAdmin={isAdmin()}></Header>
            <div className="measurements_body">
                {measurements.map((measurement, key) =>{
                    return <Card type="measurement" obj = {measurement} isAdmin={isAdmin()}/>
                })}
                {openModal?
                <MeasurementsModal type="add"/>
                : <></>}
                {isAdmin()?
                <Icon type="plus" onClick={open}></Icon>
                : <></>}
            </div>
        </div>
    </>;
}

export default MeasurementsPage;