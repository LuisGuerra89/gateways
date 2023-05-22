import React from 'react';
import { useEffect, useState } from "react";
import { router } from "next/client";
import { useRouter } from "next/router";
import AddGatewayForm from "@/pages/gateway/AddGatewayForm";
import { Gateway } from "@/data/Gateway";

const Gateways = () => {
  const [gateways, setGateways] = useState([]);
  const [id, setId] = useState<string>(null)
  const [gateway, setGateway] = useState<Gateway>(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const openDialog = (serialNumber: string) => {
    setIsOpen(true);
    setId(serialNumber)
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/gateway', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      if (response.ok) {
        const deletedGateway = await response.json();
        console.log('Gateway deleted:', deletedGateway);
      } else {
        const error = await response.json();
        console.error('Failed to delete gateway:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    closeDialog();
  };

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await fetch('/api/gateway');
        if (response.ok) {
          const data = await response.json();
          setGateways(data);
        } else {
          console.log('error getting')
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchGateways();
  }, [isOpenAdd]);

  const router = useRouter()
  const handleAdd = () => {
    // router.push('gateway/AddGatewayPage')
    setIsOpenAdd(true)
  };

  const handleUpdate = (serialNumber) => {
    router.push(`gateway/AddGatewayPage/?id=${serialNumber}`)
  };


  const openDialogAdd = (gateway: Gateway) => {
    setIsOpenAdd(true);
    setGateway(gateway)
  };

  const closeDialogApp = () => {
    setIsOpenAdd(false);
  };



  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Gateway List</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Serial Number
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                IP Address
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            {gateways.map((gateway, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {gateway.serialNumber}
                  </th>
                  <td className="px-6 py-4">
                    {gateway.name}
                  </td>
                  <td className="px-6 py-4">
                    {gateway.ipAddress}
                  </td>
                  <td className="px-6 py-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
                        onClick={() => openDialogAdd(gateway)}
                    >
                      Update
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                        onClick={() => openDialog(gateway.serialNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>))}

            </tbody>
          </table>
        </div>

        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
            onClick={handleAdd}
        >
          Add Gateway
        </button>
        <button
            className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4"
            onClick={() => router.back()}
        >
          Back
        </button>

        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white w-96 p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <div className="p-6 text-center">
                  <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                  <button onClick={() => handleDelete()} data-modal-hide="popup-modal" type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                  </button>
                  <button onClick={closeDialog} data-modal-hide="popup-modal" type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                    cancel
                  </button>
                </div>
              </div>
            </div>
        )}

        {isOpenAdd && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white w-96 p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add Gateway</h2>
               <AddGatewayForm gatewayId={'d'} onClose={closeDialogApp} gateway={gateway}/>
              </div>
            </div>
        )}
      </div>
  );
};

export default Gateways;
