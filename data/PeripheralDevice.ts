export interface PeripheralDevice {
    uid: number;
    vendor: string;
    dateCreated: Date;
    status: 'online' | 'offline';
}