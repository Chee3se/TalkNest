import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <Layout header={"Create Post"}>
            <Head title="Create Post" />
            <div className="container mx-auto py-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Create Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            {errors.title && <div className="text-red-500 mt-1">{errors.title}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Content</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="10"
                            ></textarea>
                            {errors.content && <div className="text-red-500 mt-1">{errors.content}</div>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
                                Create
                            </button>
                            <Link href="/posts" className="text-indigo-500 hover:text-indigo-700">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
