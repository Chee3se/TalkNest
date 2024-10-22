import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import Rating from "@/Components/Rating.jsx";

export default function Index({ auth, posts }) {
    console.log(posts[0])
    return (
        <Layout header={"Posts"}>
            <Head title="Posts" />
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <Link href={`/posts/${post.id}`} className="text-indigo-500 hover:text-indigo-700">
                                    Read more
                                </Link>
                                <Rating auth={auth} postId={post.id} initialRating={post.rating} initialVote={post.user_rate}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
