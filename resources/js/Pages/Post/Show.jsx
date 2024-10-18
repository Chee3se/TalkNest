import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Index({ auth }) {
    return (
        <Layout header={"Posts"}>
            <div className="flex w-full justify-center">
                <h1 className="pt-48 text-8xl font-bold">Show</h1>
            </div>
        </Layout>
    );
}
