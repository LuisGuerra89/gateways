import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/router";
import { Gateway } from "@/data/Gateway";

type GatewayFormData = {
  serialNumber: string;
  name: string;
  ipAddress: string;
  peripherals: [],
};

type AddGatewayFormProps = {
  onClose: () => void;
  onAddGateway: (data: GatewayFormData) => void;
  gateway:Gateway
};

const AddGatewayForm: React.FC<AddGatewayFormProps> = ({ onClose, onAddGateway,gateway }) => {
  const [newGateway, setNewGateway] = useState(gateway);
  const { control, handleSubmit, formState: { errors } } = useForm<GatewayFormData>();
  const router = useRouter();
console.log(gateway)
  const onSubmit = async (data: GatewayFormData) => {
    try {
        const response = await fetch('/api/gateway', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedGateway = await response.json();
          onClose()
        } else {
          console.log('error updating..')
        }
    } catch (error) {
      console.log(error)
    }
  };



  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="serialNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial Number</label>
          <Controller
              control={control}
              defaultValue={newGateway?.serialNumber??''}
              name="serialNumber"
              rules={{ required: true }}
              render={({ field }) => (
                  <input {...field} type="text" id="serialNumber" placeholder="Serial number"
                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
              )}
          />
          {errors.serialNumber && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <Controller
              control={control}
              defaultValue={newGateway?.name??''}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                  <input {...field} type="text" id="name" placeholder="Name"
                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
              )}
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="ip-address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ip Address</label>
          <Controller
              control={control}
              defaultValue={newGateway?.ipAddress??''}
              name="ipAddress"
              rules={{ required: true }}
              render={({ field }) => (
                  <input {...field} type="text" id="ip-address" placeholder="192.168.1.1"
                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
              )}
          />
          {errors.ipAddress && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} type="button"
                  className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </button>
          <button type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </form>
  );
};

export default AddGatewayForm;
