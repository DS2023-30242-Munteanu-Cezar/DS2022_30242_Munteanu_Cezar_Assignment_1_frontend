import React, { createContext, useState, FC } from "react";
import { MeasurementsContextType, MeasurementType } from "../types/context_types";
import getAxiosInstanceCustom from "../utils/axios_serv";

export const MeasurementsContext = createContext<MeasurementsContextType>({
    measurements: [],
    setMeasurements: () => {},
    getMeasurements: () => {},
});

const MeasurementsProvider: FC<{children: React.ReactNode}> = ({ children }) =>{
    const [measurements, setMeasurements] = useState<MeasurementType[]>([]);
    const myData: MeasurementType[] = [];

    async function getMeasurements(){
        const response= await getAxiosInstanceCustom().get("/measurements");

        for(let i = 0 ; i < response.data.length; i++){
            myData[i] = response.data[i];
        }

        return myData;
    }

    return <MeasurementsContext.Provider value={{measurements, setMeasurements, getMeasurements}}>
        {children}
    </MeasurementsContext.Provider>
}

export default MeasurementsProvider;