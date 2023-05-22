import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import DashboardLayout from "@/components/Layout/DashboardLayout";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <DashboardLayout>
            <Component {...pageProps} />
        </DashboardLayout>
    );
};

export default MyApp;
