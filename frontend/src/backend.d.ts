import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    customerName: string;
    status: BookingStatus;
    serviceType: ServiceType;
    message?: string;
    preferredDate: string;
    category: BookingCategory;
    phoneNumber: string;
}
export enum BookingCategory {
    appointment = "appointment",
    homeTour = "homeTour",
    nameChange = "nameChange"
}
export enum BookingStatus {
    pending = "pending",
    confirmed = "confirmed"
}
export enum ServiceType {
    tarotCardReading = "tarotCardReading",
    vastu = "vastu",
    numerology = "numerology",
    pronology = "pronology"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(serviceType: ServiceType, category: BookingCategory, customerName: string, phoneNumber: string, preferredDate: string, message: string | null): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
}
