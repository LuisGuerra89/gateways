import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import { PeripheralDevice } from '../../data';

let devices: PeripheralDevice[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = req.query;
    if (id) {
      const device = devices.find((g: any) => g.uid === id);
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({message: 'Device not found'});
      }
    } else {

      res.status(200).json(devices);
    }
  } else if (req.method === 'POST') {
    const {vendor, status} = req.body;
    const uid = uuidv4()
    const dateCreated = new Date()
    const device: PeripheralDevice = {
      uid,
      vendor,
      dateCreated,
      status,
    };
    devices.push(device);

    res.status(201).json(device);
  } else if (req.method === 'PUT') {
    const {uid, vendor, dateCreated, status} = req.body;

    const updatedDevice: PeripheralDevice = {
      uid,
      vendor,
      dateCreated,
      status
    };

    const index = devices.findIndex((device: any) => device.uid === uid);
    if (index !== -1) {
      devices[index] = updatedDevice;
      res.status(200).json(updatedDevice);
    } else {
      res.status(404).json({message: 'Device not found'});
    }
  } else if (req.method === 'DELETE') {
    const {id} = req.body;
    const index = devices.findIndex((gateway: any) => gateway.uid === id);
    if (index !== -1) {
      const deletedGateway = devices.splice(index, 1)[0];
      res.status(200).json(deletedGateway);
    } else {
      res.status(404).json({message: 'Device not found'});
    }
  }
}
