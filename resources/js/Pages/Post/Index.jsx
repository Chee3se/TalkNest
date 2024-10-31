import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import Rating from "@/Components/Rating.jsx";
import { marked } from "marked";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default function Index({ auth, posts = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("newest"); // State for sorting
    const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState(posts); // State for filtered and sorted posts
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

    // Function to sort posts based on selected sort type
    const sortPosts = (posts) => {
        switch (sortType) {
            case "newest":
                return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case "oldest":
                return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case "mostLiked":
                return [...posts].sort((a, b) => b.rating - a.rating);
            case "leastLiked":
                return [...posts].sort((a, b) => a.rating - b.rating);
            default:
                return posts;
        }
    };

    // Function to filter and sort posts based on search term and selected sort type
    const handleFilter = () => {
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAndSortedPosts(sortPosts(filteredPosts));
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Use effect to filter and sort posts when search term or sort type changes
    useEffect(() => {
        handleFilter();
    }, [searchTerm, sortType]); // Re-run when searchTerm or sortType changes

    // Handle sort type selection from dropdown
    const handleSortSelection = (type) => {
        setSortType(type);
        setIsDropdownOpen(false); // Close the dropdown after selecting an option
    };

    return (
        <Layout header={"Posts"}>
            <Head title="Posts" />
            <div className="container mx-auto py-8">
                {/* Search bar and dropdown menu */}
                <div className="mb-6 w-full max-w-2xl mx-auto flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="text-xl mb-4 pb-2 border-2 border-gray-300 rounded-lg p-2 flex-grow"
                    />
                    {/* Dropdown button */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none"
                        >
                            Sort By
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg z-10">
                                <button 
                                    onClick={() => handleSortSelection("newest")} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                                >
                                    Newest
                                </button>
                                <button 
                                    onClick={() => handleSortSelection("oldest")} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                                >
                                    Oldest
                                </button>
                                <button 
                                    onClick={() => handleSortSelection("mostLiked")} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                                >
                                    Most Liked
                                </button>
                                <button 
                                    onClick={() => handleSortSelection("leastLiked")} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                                >
                                    Least Liked
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    {filteredAndSortedPosts.map((post) => (
                        <div key={post.id} className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-gray-300 text-right">
                                {post.title}
                                {dayjs().diff(dayjs(post.created_at), 'hour') < 1 && (
                                    <span className="ml-2 text-sm text-gray-50 bg-gradient-to-r from-blue-300 to-blue-500 py-2 px-4 rounded-xl right-6 top-6 absolute">New!</span>
                                )}
                            </h2>
                            <div className="text-gray-700 max-h-40 overflow-hidden relative">
                                <div
                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none"></div>
                                <div className="relative z-10"
                                     dangerouslySetInnerHTML={{__html: marked(post.content)}}></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <Link href={`/posts/${post.id}`} className="text-orange-500 hover:text-red-700 hover:underline">
                                    Read more
                                </Link>
                                <Rating auth={auth} postId={post.id} initialRating={post.rating} initialVote={post.user_rate}/>
                            </div>
                        </div>
                    ))}
                    <Link href={route('posts.create')} className="fixed right-0 bottom-0 mb-10 mr-10 text-gray-100 no-underline bg-blue-500 hover:bg-blue-600 duration-200 px-4 py-1.5 rounded-xl">
                        Create Post
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
