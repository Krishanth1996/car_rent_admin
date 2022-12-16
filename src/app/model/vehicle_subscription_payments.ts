import { Vehicle } from "./vehicle"
import { VehicleOwner } from "./vehicle_owner"

export interface VehicleSubscriptionPayment {
    subscription_payment_id: string,
    vehicle_id: string,
    vehicle_subscription_id: string,
    vehicle: Vehicle,
    owner: VehicleOwner,
    subscription: VehicleSubscription
    paid_on: Date,
    next_payment: Date,
    is_deleted: boolean,
    created_at: Date
    updated_at: Date

}

export interface VehicleSubscription {
    subscription_id: string,
    type_name: PAYMENT_TYPE,
    amount: number,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date
}

export enum PAYMENT_TYPE {
    INITIAL = "INITIAL",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}