import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Index({ auth, posts }) {
    return (
        <Layout header={"Posts"}>
            <ul>
                {posts.map((post) => (
                    <li key={post}>{post}</li>
                ))}
            </ul>
        </Layout>
    );
}
