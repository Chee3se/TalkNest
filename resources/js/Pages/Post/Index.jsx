import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import { useState } from "react";
import axios from "axios";

export default function Index({ auth, posts }) {
    const [message, setMessage] = useState("");

    const handleRate = async (postId, type) => {
        if (!auth.user) {
            setMessage("You need to be logged in to rate.");
            return;
        }

        try {
            const response = await axios.post(`/posts/${postId}/rate`, {
                type,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <Layout header={"Posts"}>
            <Head title="Posts" />
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-700">
                                {post.content.substring(0, 100)}...
                            </p>
                            <p className="text-gray-700">
                                Rating: {post.rating}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="text-indigo-500 hover:text-indigo-700"
                                >
                                    Read more
                                </Link>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            handleRate(post.id, true)
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Upvote
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRate(post.id, false)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Downvote
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {message && (
                    <p className="text-center text-red-500 mt-4">{message}</p>
                )}
            </div>
        </Layout>
    );
}
