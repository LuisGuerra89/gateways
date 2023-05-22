import React from 'react';
import {useEffect,useState} from "react";
import {router} from "next/client";
import {useRouter} from "next/router";
import Link from "next/link";

const HomePage = () => {

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gateway List</h1>

            <ul>
                <li><Link href={'/gateway'}>Gateways</Link></li>
                <li><Link href={'/device'}>Devices</Link></li>
            </ul>
        </div>

    );
};

export default HomePage;
