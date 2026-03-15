import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingRequest {
    customerName: string;
    serviceType: ServiceType;
    message?: string;
    preferredDate: string;
    preferredTime: string;
    category: BookingCategory;
    phoneNumber: string;
}
export interface Booking {
    id: bigint;
    customerName: string;
    status: BookingStatus;
    serviceType: ServiceType;
    message?: string;
    preferredDate: string;
    preferredTime: string;
    category: BookingCategory;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export enum BookingCategory {
    appointment = "appointment",
    homeTour = "homeTour",
    nameChange = "nameChange"
}
export enum BookingError {
    invalidInput = "invalidInput",
    internalError = "internalError"
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
    createBooking(request: BookingRequest): Promise<{
        __kind__: "ok";
        ok: Booking;
    } | {
        __kind__: "err";
        err: BookingError;
    }>;
    deleteAllBookings(): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTotalBookingCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
