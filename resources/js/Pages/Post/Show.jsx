import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Index({ auth, post }) {
    return (
        <Layout header={"Posts"}>
            <div className="flex w-full justify-center">
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <p className="text-lg mb-2">{post.content}</p>
                    <p className="text-sm text-gray-500">
                        Rating: {post.rating}
                    </p>
                    <p className="text-sm text-gray-500">
                        Author ID: {post.user_id}
                    </p>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="w-full max-w-4xl bg-white p-8 mt-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {/* Placeholder for the comment section */}
                    <input type="text" />
                    <p className="text-gray-500">
                        No comments yet. Be the first to comment!
                    </p>
                </div>
            </div>
        </Layout>
    );
}
