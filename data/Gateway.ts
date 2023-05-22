import { PeripheralDevice } from './PeripheralDevice';

export interface Gateway {
    serialNumber: string;
    name: string;
    ipAddress: string;
    peripherals: PeripheralDevice[];
}