import { Image } from "./common";
import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

export interface Order {
    order_id: number;
    // customer_id: number;
    // vehicle_id: number;
    order_date: Date;
    rent_start_time: Date;
    rent_end_time: Date;
    rent_start_km: number;
    rent_end_km: number;
    extra_charges: number;
    is_completed: number;
    is_deleted: number;
    created_at: Date;
    updated_at: Date;
    customer: Customer,
    vehicle: Vehicle
}
