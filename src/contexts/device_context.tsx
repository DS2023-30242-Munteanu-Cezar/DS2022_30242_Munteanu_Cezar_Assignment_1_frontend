import { DeviceContextType, DeviceType } from "../types/context_types";
import React, { createContext, useState, FC } from "react";
import getAxiosInstanceCustom from "../utils/axios_serv";

export const DeviceContext = createContext<DeviceContextType>({
    devices: [],
    setDevices: () =>{},
    getDevices: () =>{}
});

const DeviceProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [devices, setDevices] = useState<DeviceType[]>([]);
    const myData: DeviceType[] = [];

    async function getDevices() {
        const response = await getAxiosInstanceCustom().get("/devices");

        for(let i = 0; i< response.data.length; i++){
            myData[i] = response.data[i];
        }


        return myData;
    }

    return <DeviceContext.Provider value={{devices, setDevices, getDevices}}>
        {children}
    </DeviceContext.Provider>
}

export default DeviceProvider;