import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Home({ auth, laravelVersion, phpVersion }) {
    return (
        <Layout header={"Home"}>
            <div className="flex w-full justify-center ">
                <h1 className="pt-48 text-8xl font-bold">Yello</h1>
            </div>
        </Layout>
    );
}
