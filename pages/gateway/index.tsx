import React from 'react';
import {useEffect,useState} from "react";
import {router} from "next/client";
import {useRouter} from "next/router";

const Gateways = () => {
    const [gateways, setGateways] = useState([]);
    const [id,setId] = useState<string>(null)
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (serialNumber:string) => {
        setIsOpen(true);
        setId(serialNumber)
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleDelete = async() => {
        console.log(id)
        try {
            const response = await fetch('/api/gateway', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
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
    }, []);

    const router = useRouter()
    const handleAdd = () => {
        router.push('gateway/AddGatewayPage')
    };

    const handleUpdate = (serialNumber) => {
        router.push(`gateway/AddGatewayPage/?id=${serialNumber}`)
    };



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gateway List</h1>

            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Serial Number</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">IP Address</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {gateways.map((gateway,index) => (
                    <tr key={index}>
                        <td className="px-4 py-2">{gateway.serialNumber}</td>
                        <td className="px-4 py-2">{gateway.name}</td>
                        <td className="px-4 py-2">{gateway.ipAddress}</td>
                        <td className="px-4 py-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
                                onClick={() => handleUpdate(gateway.serialNumber)}
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
                    </tr>
                ))}
                </tbody>
            </table>

            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
                onClick={handleAdd}
            >
                Add Gateway
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete the gateway?</p>
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

export default Gateways;
