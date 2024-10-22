import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Home({ auth, laravelVersion, phpVersion }) {
    return (
        <Layout header={"Home"}>
            <div style={{ fontFamily: "'Exo 2', sans-serif" }} className="flex w-full justify-center">
                <h1 className="pt-96 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 text-3xl font-black">Welcome to TalkNest!</h1>

            </div>
            <div style={{ fontFamily: "'Exo 2', sans-serif" }} className="flex w-full justify-center text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 text-3xl font-black">
            <h2 className="pt-40 text-4xl font-bold place-content-center">Write new posts, get feedback from people, explore!</h2>
            </div>
            <div style={{ fontFamily: "'Exo 2', sans-serif" }} className="flex w-full justify-center text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 text-3xl font-black">
            <h2 className="pt-96 text-sm font-bold place-content-center">(Click on the 'Posts' tab to begin!)</h2>
            </div>
        </Layout>
    );
}
