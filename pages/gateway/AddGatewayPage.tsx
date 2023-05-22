import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

const AddGatewayPage = ({gatewayId}) => {
  const [devices, setDevices] = useState([]);
  const [newGateway, setNewGateway] = useState({
    serialNumber: '',
    name: '',
    ipAddress: '',
    peripherals: devices,
  });
  const { handleSubmit, control, formState: { errors } } = useForm();
  const router = useRouter();

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setNewGateway({...newGateway, [e.target.name]: e.target.value});
  };

  const handleAdd = async () => {
    try {
      if (gatewayId) {
        const response = await fetch('/api/gateway', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGateway),
        });
        if (response.ok) {
          const updatedGateway = await response.json();
          router.push('/gateway');
        } else {
          console.log('error updating..')
        }
      } else {
        const response = await fetch('/api/gateway', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGateway),
        });
        if (response.ok) {
          const addedGateway = await response.json();
          router.push('/gateway');
        } else {
          console.log('error adding...')
        }
      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    const getGateway = async () => {
      try {
        const response = await fetch(`/api/gateway?serialNumber=${gatewayId}`);
        const data = await response.json();
        if (response.ok) {
          setNewGateway(data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (gatewayId) {
      getGateway();
    }
  }, [gatewayId]);

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
  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Add Gateway</h1>

        <div className="flex">
          <input
              className="border rounded px-2 py-1 mr-2"
              type="text"
              placeholder="Serial Number"
              name="serialNumber"
              value={newGateway.serialNumber}
              onChange={handleInputChange}
          />
          <input
              className="border rounded px-2 py-1 mr-2"
              type="text"
              placeholder="Name"
              name="name"
              value={newGateway.name}
              onChange={handleInputChange}
          />
          <input
              className="border rounded px-2 py-1 mr-2"
              type="text"
              placeholder="IP Address"
              name="ipAddress"
              value={newGateway.ipAddress}
              onChange={handleInputChange}
          />
          <select
              multiple
              id="peripherals"
              className="border rounded px-2 py-1 mr-2"
              onChange={handleInputChange}
          >
            {devices?.map((device) => (
                <option key={device.uid} value={device.uid}>
                  {device.vendor}
                </option>
            ))}
          </select>
          <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
              onClick={handleAdd}
          >
            Add
          </button>
          <button
              className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4"
              onClick={()=>router.back()}
          >
            Back
          </button>
        </div>
      </div>
  );
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  const gatewayId = id || null;
  return {
    props: {
      gatewayId,
    },
  };
}

export default AddGatewayPage;
