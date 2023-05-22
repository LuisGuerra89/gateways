import React from 'react';
import { useEffect, useState } from "react";
import { router } from "next/client";
import { useRouter } from "next/router";
import { format } from "date-fns";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [id, setId] = useState<string>(null)
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (serialNumber: string) => {
    setIsOpen(true);
    setId(serialNumber)
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/devices', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      if (response.ok) {
        const deletedGateway = await response.json();
        console.log('Device deleted:', deletedGateway);
      } else {
        const error = await response.json();
        console.error('Failed to delete device:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    closeDialog();
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices');
        if (response.ok) {
          const data = await response.json();
          setDevices(data);
        } else {
          console.log('error getting')
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchDevices();
  }, []);

  const router = useRouter()
  const handleAdd = () => {
    router.push('device/AddDevicePage')
  };

  const handleUpdate = (uid) => {
    router.push(`device/AddDevicePage/?id=${uid}`)
  };


  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Device List</h1>

        <table className="min-w-full">
          <thead>
          <tr>
            <th className="px-4 py-2">Vendor</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          {devices.map((device, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{device.vendor}</td>
                <td className="px-4 py-2">{device.dateCreated}</td>
                <td className="px-4 py-2">{device.status}</td>
                <td className="px-4 py-2">
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
                      onClick={() => handleUpdate(device.uid)}
                  >
                    Update
                  </button>
                  <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                      onClick={() => openDialog(device.uid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
            onClick={handleAdd}
        >
          Add Device
        </button>
          <button
              className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4"
              onClick={()=>router.back()}
          >
              Back
          </button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white w-96 p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete the device?</p>
                <div className="mt-4 flex justify-end">
                  <button
                      onClick={() => handleDelete()}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                      onClick={closeDialog}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Devices;
