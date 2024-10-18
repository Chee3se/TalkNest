import { Head, Link } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";

export default function Home({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Layout header={"Home"}>
            <div className="flex w-full justify-center ">
                <h1 className="pt-48 text-8xl font-bold">Yello</h1>
            </div>
        </Layout>
    );
}
