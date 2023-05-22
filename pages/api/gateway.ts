import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import { Gateway, PeripheralDevice } from '../../data';

let gateways: Gateway[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {serialNumber} = req.query;
    if (serialNumber) {
      const gateway = gateways.find((g: any) => g.serialNumber === serialNumber);
      if (gateway) {
        res.status(200).json(gateway);
      } else {
        res.status(404).json({message: 'Gateway not found'});
      }
    } else {

      res.status(200).json(gateways);
    }
  } else if (req.method === 'POST') {
    const {serialNumber, name, ipAddress, peripherals} = req.body;
    const gateway: Gateway = {
      serialNumber,
      name,
      ipAddress,
      peripherals: peripherals || [],
    };
    gateways.push(gateway);

    res.status(201).json(gateway);
  } else if (req.method === 'PUT') {
    const {serialNumber, name, ipAddress, peripherals} = req.body;

    const updatedGateway: Gateway = {
      serialNumber,
      name,
      ipAddress,
      peripherals: peripherals || [],
    };

    const index = gateways.findIndex((gateway: any) => gateway.serialNumber === serialNumber);
    if (index !== -1) {
      gateways[index] = updatedGateway;
      res.status(200).json(updatedGateway);
    } else {
      res.status(404).json({message: 'Gateway not found'});
    }
  } else if (req.method === 'DELETE') {
    const {id} = req.body;
    console.log(req)
    const index = gateways.findIndex((gateway: any) => gateway.serialNumber === id);
    if (index !== -1) {
      const deletedGateway = gateways.splice(index, 1)[0];
      res.status(200).json(deletedGateway);
    } else {
      res.status(404).json({message: 'Gateway not found'});
    }
  }
}
