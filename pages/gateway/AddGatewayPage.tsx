import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';

const AddGatewayPage = ({ gatewayId }) => {
    const [newGateway, setNewGateway] = useState({
        serialNumber: '',
        name: '',
        ipAddress: '',
        peripherals: [],
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        setNewGateway({ ...newGateway, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            if(gatewayId){
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
            }else{
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
        if(gatewayId){
        getGateway();}
    }, [gatewayId]);

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
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    const { id } = context.query;
    const gatewayId = id || null;
    return {
        props: {
            gatewayId,
        },
    };
}

export default AddGatewayPage;
