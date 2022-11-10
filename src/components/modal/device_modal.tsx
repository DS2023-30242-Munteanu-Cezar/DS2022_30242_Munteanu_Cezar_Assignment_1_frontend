import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DeviceContext } from "../../contexts/device_context";
import { DeviceContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import Button from "../button/button";
import Icon from "../icon/icon";
import "./device_modal.scss";

interface DeviceModalComponent{
    obj?: any;
    type?: string;
}

const DeviceModal = (props: DeviceModalComponent) =>{
    const [updateInfo, setUpdateInfo] = useState({ userUsername: "", energyConsumption: "", adress: "", description: ""});
    const {devices, setDevices} = useContext<DeviceContextType>(DeviceContext);
    const [display, setDisplay] = useState<string>("flex");
    const navigate: NavigateFunction = useNavigate();

    const close = () =>{
        setDisplay("none");
    }

    const aux = props.obj;

    async function handleUpdate(event: any){
        event.preventDefault();

        devices.map((device) => {
            if(device.id === aux.id){
                
               
                if(updateInfo.userUsername !== ""){
                    device.userUsername = updateInfo.userUsername;
                }
                else{
                    device.userUsername = aux.userUsername;
                    updateInfo.userUsername = aux.userUsername;
                }
                
                if(updateInfo.energyConsumption !== ""){
                    device.energyConsumption = Number(updateInfo.energyConsumption);
                }
                else{
                    device.energyConsumption = aux.energyConsumption;
                    updateInfo.energyConsumption = aux.energyConsumption;
                }
                if(updateInfo.adress !== ""){
                    device.adress = updateInfo.adress;
                }
                else{
                    device.adress = aux.adress;
                    updateInfo.adress = aux.adress;
                }
                if(updateInfo.description !== ""){
                    device.description = updateInfo.description;
                }
                else{
                    device.description = aux.description;
                    updateInfo.description = aux.description;
                }
            }
        })

        setDevices(devices);
        // console.log(updateInfo);

        await getAxiosInstanceCustom().post("/devices/update", JSON.stringify({id: aux.id, userUsername:updateInfo.userUsername, energyConsumption: updateInfo.energyConsumption, adress: updateInfo.adress, description: updateInfo.description}));
        close();
        navigate("/devices");
    }

    async function handleAdd(event: any){
        event.preventDefault();
        console.log(updateInfo);
        await getAxiosInstanceCustom().post("/devices", JSON.stringify(updateInfo));
        close();
        navigate("/devices");
    }


    return <>
        <div className="device_modal" style={{display: display}}>
            <div className="device_modal_body">
                <Icon type="x" onClick={close}/>
                <form className="device_modal_form">
                    <label className="device_modal_label">
                        User username:
                        <input className="device_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.userUsername = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    <label className="device_modal_label">
                        Energy Consumption:
                        <input className="device_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.energyConsumption = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    <label className="device_modal_label">
                        Adress:
                        <input className="device_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.adress = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}/>
                    </label>
                    <label className="device_modal_label">
                        Description:
                        <input className="device_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.description = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    {props.type === "update"?
                    <Button name="Update" onClick={handleUpdate}></Button>
                    :   <Button name="Add device" onClick={handleAdd}></Button>
                }
                </form>
            </div>
        </div>
    </>;
}

export default DeviceModal;