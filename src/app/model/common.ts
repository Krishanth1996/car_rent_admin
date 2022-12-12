export interface API{
    isError:boolean,
    length:number,
    data:any
}

export interface Image {
    type: string;
    data: number[];
}

export enum GEAR_TYPE{
    AUTOMATIC="AUTOMATIC",
    MANUAL="MANUAL",
    CVT="CVT"
}
export enum INSURANCE{
    FULL="FULL",
    THIRD_PARTY="THIRD_PARTY",
}
export enum FUEL_TYPE{
    BIO_DIESEL="BIO_DIESEL",
    CNG="CNG",
    DIESEL="DIESEL",
    ETHANOL="ETHANOL",
    ELECTRIC="ELECTRIC",
    HYBRID="HYBRID",
    LIQUID_PETROLEUM_GAS="LIQUID_PETROLEUM_GAS",
    PETROL="PETROL",
    METHANOL="METHANOL",
}

export interface Locations{
    location_id:string,
    latitude:string,
    longitude:string
    is_deleted:boolean
}
