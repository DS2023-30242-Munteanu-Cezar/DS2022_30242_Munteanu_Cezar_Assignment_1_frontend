

export type LoginType = {
    username: string,
    role: string
};

export type LoginContextType = {
    loginData: LoginType,
    setLoginData: React.Dispatch<React.SetStateAction<LoginType>>,
    getLogin(): any
};

export type UserType = {
    username: string,
    email: string,
    password: string,
    roleCode: string
};

export type UsersContextType = {
    users: UserType[],
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>,
    getUsers: any
}

export type User = {
    username: string,
    email: string,
    roleCode: string
}

export type DeviceType = {
    id: string,
    userUsername: string,
    energyConsumption: number,
    adress: string,
    description: string,
    measurementIds: string[],
}

export type DeviceContextType = {
    devices: DeviceType[],
    setDevices: React.Dispatch<React.SetStateAction<DeviceType[]>>,
    getDevices: any
}

export type MeasurementType ={
    id: string,
    energyConsumption: number,
    timestamp: Date,
    deviceId: string
}

export type MeasurementsContextType = {
    measurements: MeasurementType[],
    setMeasurements: React.Dispatch<React.SetStateAction<MeasurementType[]>>,
    getMeasurements: any
}