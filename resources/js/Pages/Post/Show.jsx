import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function Show({ auth, post }) {
    const sanitizedContent = DOMPurify.sanitize(marked(post.content));

    return (
        <Layout header={"Post"}>
            <Head title={post.title} />
            <div className="container mx-auto py-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-gray-300">{post.title}</h1>
                    <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    ></div>
                    <div className="flex justify-between items-center mt-4">
                        <Link href={`/posts/${post.id}/edit`} className="text-indigo-500 hover:text-indigo-700">
                            Edit
                        </Link>
                        <Link href="/posts" className="text-indigo-500 hover:text-indigo-700">
                            Back to Posts
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
