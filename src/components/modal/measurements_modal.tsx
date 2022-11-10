import { useContext, useState } from "react";
import {NavigateFunction, useNavigate } from "react-router-dom";
import { MeasurementsContext } from "../../contexts/measurement_context";
import { MeasurementsContextType } from "../../types/context_types";
import getAxiosInstanceCustom from "../../utils/axios_serv";
import Button from "../button/button";
import Icon from "../icon/icon";
import "./measurements_modal.scss";

interface MeasurementsModalComponent{
    obj?: any;
    type?: string;
}

const MeasurementsModal = (props: MeasurementsModalComponent) =>{
    const {measurements, setMeasurements} = useContext<MeasurementsContextType>(MeasurementsContext);
    const [updateInfo, setUpdateInfo] = useState({energyConsumption: "", timestamp: null, deviceId: ""});
    const [display, setDisplay] = useState<string>("flex");
    const navigate: NavigateFunction = useNavigate();
    const close = () =>{
        setDisplay("none");
    }

    async function handleUpdate(event: any) {
        event.preventDefault();
        const aux = props.obj;

        measurements.map((measurement) => {
            if(measurement.id === aux.id){
                if(updateInfo.energyConsumption !== ""){
                    measurement.energyConsumption = Number(updateInfo.energyConsumption);
                }
                else{
                    updateInfo.energyConsumption = aux.energyConsumption;
                }

                if(updateInfo.timestamp !==  null){
                    measurement.timestamp = updateInfo.timestamp;
                }
                else{
                    updateInfo.timestamp = aux.timestamp;
                }

                if(updateInfo.deviceId !== ""){
                    measurement.deviceId = updateInfo.deviceId;
                }
                else{
                    updateInfo.deviceId = aux.deviceId;
                }
            }
        });
        setUpdateInfo(updateInfo);

        setMeasurements(measurements);
        console.log(updateInfo);

        await getAxiosInstanceCustom().post("/measurements/update", JSON.stringify({id: aux.id, energyConsumption: updateInfo.energyConsumption, timestamp: updateInfo.timestamp, deviceId: updateInfo.deviceId}));
        close();
        navigate("/measurements");
    }

    async function handleAdd(event: any){
        event.preventDefault();
        
        await getAxiosInstanceCustom().post("/measurements", JSON.stringify(updateInfo));
        
        close();
        navigate("/measurements");
    }

    
    return <>
        <div className="measurements_modal" style={{display: display}}>
            <div className="measurements_modal_body">
                <Icon type="x" onClick={close}/>
                <form className="measurements_modal_form">
                    <label className="measurements_modal_label">
                        Energy Consumption:
                        <input className="measurements_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.energyConsumption = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    <label className="measurements_modal_label">
                        Timestamp:
                        <input className="measurements_modal_input" type="date" onChange={(event: any) =>{
                            updateInfo.timestamp = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    <label className="measurements_modal_label">
                        Device id:
                        <input className="measurements_modal_input" type="text" onChange={(event: any) =>{
                            updateInfo.deviceId = event.target.value;
                            setUpdateInfo(updateInfo);
                        }}></input>
                    </label>
                    {props.type === "update"?
                    <Button name="Update" onClick={handleUpdate}></Button>
                    : <Button name="Add measurement" onClick={handleAdd}></Button>}
                </form>
            </div>
        </div>
    </>;
}

export default MeasurementsModal;