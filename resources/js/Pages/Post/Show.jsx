import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";

export default function Show({ auth, post }) {
    const sanitizedContent = DOMPurify.sanitize(marked(post.content));
    const {
        data,
        setData,
        post: postComment,
        reset,
    } = useForm({ content: "" });

    const submitComment = (e) => {
        e.preventDefault();
        postComment(route("comments.store", { post: post.id }), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout header={"Post"}>
            <Head title={post.title} />
            <div className="container mx-auto py-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-gray-300">
                        {post.title}
                    </h1>
                    <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    ></div>
                    <div className="flex justify-between items-center mt-4">
                        {auth.user && auth.user.id === post.user_id && (
                            <div className="flex gap-4">
                                <Link
                                    href={route("posts.edit", { id: post.id })}
                                    className="text-gray-100 no-underline bg-blue-500 hover:bg-blue-600 duration-200 px-4 py-1.5 rounded-xl"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route("posts.destroy", {
                                        id: post.id,
                                    })}
                                    method="delete"
                                    as="button"
                                    className="text-gray-100 no-underline bg-red-500 hover:bg-red-600 duration-200 px-4 py-1.5 rounded-xl"
                                >
                                    Delete
                                </Link>
                            </div>
                        )}
                        <Link
                            href="/posts"
                            className="text-indigo-500 hover:text-indigo-700"
                        >
                            Back to Posts
                        </Link>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white mt-8 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="mb-4 border-b pb-4"
                            >
                                <p className="text-gray-600">
                                    <strong>{comment.user.name}</strong>{" "}
                                    commented:
                                </p>
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet.</p>
                    )}

                    {auth.user ? (
                        <form onSubmit={submitComment} className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                placeholder="Add a comment..."
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                            />
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Post Comment
                            </button>
                        </form>
                    ) : (
                        <p className="text-gray-500 mt-4">
                            Please{" "}
                            <Link
                                href={route("login")}
                                className="text-blue-500"
                            >
                                log in
                            </Link>{" "}
                            to comment.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
