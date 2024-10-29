import { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import Modal from "@/Components/Modal";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function Index({ auth, reports }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const { data, setData, post } = useForm({
        delete_post: null,
    });

    useEffect(() => {
        if (data.delete_post !== null) {
            post(route('reports.resolve', selectedReport.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedReport(null);
                },
            });
        }
    }, [data.delete_post]);

    const handleResolveClick = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setData("delete_post", true);
    };

    const handleNotDelete = () => {
        setData("delete_post", false);
    };

    return (
        <Layout header={"Reports"}>
            <Head title="Reports" />
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center gap-6">
                    {reports.map((report) => (
                        <div key={report.id} className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-gray-300">
                                {report.type}
                            </h2>
                            <div className="text-gray-700">
                                <div className="relative z-10">
                                    {report.content}
                                </div>
                            </div>
                            {report.status == false && (
                                <button
                                    onClick={() => handleResolveClick(report)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Resolve
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedReport && (
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-6">
                        <h2 className="text-xl font-black text-gray-900 bg-gray-200 py-2 px-4 rounded-md">Title:</h2>
                        <h3 className="text-xl font-semibold mt-2">{selectedReport.post.title}</h3>
                        <h2 className="text-xl font-black text-gray-900 bg-gray-200 py-2 px-4 rounded-md">Content:</h2>
                        <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(selectedReport.post.content))}}
                        ></div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleNotDelete}
                                className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Not Delete
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </Layout>
    );
}
