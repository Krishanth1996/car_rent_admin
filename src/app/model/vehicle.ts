import { GEAR_TYPE, INSURANCE, FUEL_TYPE, Locations } from "./common";
import { VehicleOwner } from "./vehicle_owner";

export interface Vehicle {
    id: number;
    name: string;
    brand: string;
    gear_type: GEAR_TYPE;
    mileage: number;
    number_plate: string;
    registered_date: Date;
    fuel_type: FUEL_TYPE;
    insurance_type: INSURANCE;
    owner: VehicleOwner;
    location: Locations;
    is_active: boolean;
    is_call_verified: boolean;
    is_visit_verified: boolean;
    is_available: boolean;
    is_with_driver: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
}




