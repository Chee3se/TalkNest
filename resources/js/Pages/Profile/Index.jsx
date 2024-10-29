import AuthenticatedLayout from "@/Layouts/Layout.jsx";
import { Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";

export default function Profile({ user, posts, comments }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div
                className="text-center flex justify-center items-center h-auto py-12"
                style={{
                    backgroundImage: "url(/orange-background.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-lg space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Account Information
                    </h3>

                    <div className="text-left">
                        <p className="text-gray-600">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Total Votes:</strong> {user.totalVotes}
                        </p>
                        <p className="text-gray-600">
                            <strong>Total Posts:</strong> {user.totalPosts}
                        </p>
                        <p className="text-gray-600">
                            <strong>Total Comments:</strong>{" "}
                            {user.totalComments}
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href={route("profile.edit")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Post History Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Post History
                        </h3>

                        {posts.length > 0 ? (
                            <ul className="space-y-4">
                                {posts.map((post) => (
                                    <li key={post.id} className="border-b pb-4">
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="text-xl text-indigo-500 font-semibold hover:underline"
                                        >
                                            {post.title}
                                        </Link>
                                        <p className="text-gray-600">
                                            Posted on:{" "}
                                            {dayjs(post.created_at).format(
                                                "MMMM D, YYYY"
                                            )}
                                        </p>
                                        <p className="text-gray-600">
                                            Rating: {post.rating}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No posts yet.</p>
                        )}
                    </div>

                    {/* Comment History Section */}
                    {/* Comment History Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Comment History
                        </h3>
                        {comments.length > 0 ? ( // Change this line
                            <ul className="space-y-4">
                                {comments.map((comment) => (
                                    <li
                                        key={comment.id}
                                        className="border-b pb-4"
                                    >
                                        <p className="text-gray-700">
                                            {comment.content}
                                        </p>
                                        <p className="text-gray-600">
                                            Commented on:{" "}
                                            {dayjs(comment.created_at).format(
                                                "MMMM D, YYYY"
                                            )}
                                        </p>
                                        <Link
                                            href={`/posts/${comment.post_id}`}
                                            className="text-indigo-500 hover:underline"
                                        >
                                            View Post
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
