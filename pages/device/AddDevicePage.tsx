import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';

const AddGatewayPage = ({ deviceId }) => {
    const [device, setDevice] = useState({
        uid: '',
        vendor: '',
        dateCreated: '',
        status: '',
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            if(deviceId){
                const response = await fetch('/api/devices', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(device),
                });
                if (response.ok) {
                    const updatedGateway = await response.json();
                    router.push('/device');
                } else {
                    console.log('error updating..')
                }
            }else{
            const response = await fetch('/api/devices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device),
            });
                if (response.ok) {
                    const addedGateway = await response.json();
                    router.push('/device');
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
                const response = await fetch(`/api/gateway?serialNumber=${deviceId}`);
                const data = await response.json();

                if (response.ok) {
                    setDevice(data);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if(deviceId){
        getGateway();}
    }, [deviceId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Gateway</h1>

            <div className="flex">
                <input
                    className="border rounded px-2 py-1 mr-2"
                    type="text"
                    placeholder="UID"
                    name="uid"
                    value={device.uid}
                    onChange={handleInputChange}
                />
                <input
                    className="border rounded px-2 py-1 mr-2"
                    type="text"
                    placeholder="vendor"
                    name="vendor"
                    value={device.vendor}
                    onChange={handleInputChange}
                />
                <input
                    className="border rounded px-2 py-1 mr-2"
                    type="text"
                    placeholder="Date Created"
                    name="Date Created"
                    value={device.dateCreated}
                    onChange={handleInputChange}
                />
                <input
                    className="border rounded px-2 py-1 mr-2"
                    type="text"
                    placeholder="Status"
                    name="status"
                    value={device.status}
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
