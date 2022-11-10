import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DeviceContext } from "../../contexts/device_context";
import { MeasurementsContext } from "../../contexts/measurement_context";
import { UsersContext } from "../../contexts/users_context";
import { DeviceContextType, MeasurementsContextType, UsersContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import Icon from "../icon/icon";
import DeviceModal from "../modal/device_modal";
import MeasurementsModal from "../modal/measurements_modal";
import UserModal from "../modal/users_modal";
import "./card.scss";

interface CardComponent {
    obj: any;
    isAdmin?: boolean;
    type?: string;
};


const Card = (props: CardComponent): JSX.Element =>{
    const {users, setUsers} = useContext<UsersContextType>(UsersContext);
    const {devices, setDevices}= useContext<DeviceContextType>(DeviceContext);
    const {measurements, setMeasurements} = useContext<MeasurementsContextType>(MeasurementsContext);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    async function handleDelete(event: any){
        event.preventDefault();
        if(props.type === "user"){
            users.splice(users.indexOf(props.obj), 1);
            setUsers(users);
            await getAxiosInstanceCustom().delete(`/users/delete/${props.obj.username}`);
            navigate("/users");
        }

        if(props.type === "device"){
            devices.splice(devices.indexOf(props.obj), 1);
            setDevices(devices);
            await getAxiosInstanceCustom().delete(`/devices/delete/${props.obj.id}`);
            navigate("/devices");
        }

        if(props.type === "measurement"){
            measurements.splice(measurements.indexOf(props.obj), 1);
            setMeasurements(measurements);
            await getAxiosInstanceCustom().delete(`/measurements/delete/${props.obj.id}`);
            navigate("/measurements");
        }
    }

    const open = () =>{
        setOpenModal(!openModal);
    }


    return <>
        <body className="card_body">
            {Object.keys(props.obj).map((line, key) => {
                return <>
                    <div key={key} className="card_line">
                        <span key={key+1} className="card_key">{line}</span>
                        <span key={key+2} >{(props.obj)[line]}</span>
                    </div>
                </>
            })}

            {props.isAdmin?
            <div className="options">
            <Icon type="update" onClick={open}/>
            <Icon type="trash" onClick={handleDelete}/>
            </div>
            :
            <></>}

        </body>
        {openModal && props.type === "user"?
            <UserModal obj={props.obj}/>
            :openModal && props.type === "device"?
            <DeviceModal obj={props.obj} type= "update"/>
            : openModal && props.type === "measurement"?
            <MeasurementsModal obj={props.obj} type= "update"/>
            : <></>
        }
    </>;
}

export default Card;