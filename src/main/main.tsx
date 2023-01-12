import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import { useContext, useEffect } from "react";
import { DeviceContextType, MeasurementsContextType, UsersContextType } from "../types/context_types";
import { UsersContext } from "../contexts/users_context";
import UsersPage from "../pages/users_page/users_page";
import Register from "../pages/register/register";
import { DeviceContext } from "../contexts/device_context";
import DevicesPage from "../pages/devices_page/devices_page";
import { MeasurementsContext } from "../contexts/measurement_context";
import MeasurementsPage from "../pages/measurements_page/measurements_page";
import ChatRoom from "../components/socket/ChatRoom";

const Main = () : JSX.Element =>{
    const {setUsers, getUsers} = useContext<UsersContextType>(UsersContext);
    const {setDevices, getDevices} = useContext<DeviceContextType>(DeviceContext);
    const {setMeasurements, getMeasurements} = useContext<MeasurementsContextType>(MeasurementsContext);

    useEffect(function dataFetch() {
        getUsers().then((res: any) => {
            setUsers(res);
        });
        
        getDevices().then((res: any) => {
            setDevices(res);
        });

        getMeasurements().then((res: any) => {
            setMeasurements(res);
        })
    },[]);



    return <div>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/users" element={<UsersPage/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/devices" element={<DevicesPage/>}></Route>
            <Route path="/measurements" element= {<MeasurementsPage/>}></Route>
            <Route path="/chat" element= {<ChatRoom/>}></Route>
        </Routes>
    </div>;
}

export default Main;