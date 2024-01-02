import React from "react";
import { useFetchSinglePost } from "../hooks/useFetchPosts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../utils";
import { FaThumbsUp, FaEye, FaEllipsisH } from 'react-icons/fa';
import LoadingPostsDetail from "../ui/loaders/LoadingPostDetail";

const SinglePost = () => {
    const {
        post,
        isLoading,
        isError,
        error,
    } = useFetchSinglePost()

    if (isError) {
        console.log(error);
        return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
    }

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const formatedDate = formatDate(post?.createdAt)


    return <main className="body-container">

        {
            isLoading
                ? <LoadingPostsDetail />
                : <>
                    {/* HEADER */}
                    <div className="flex justify-between ">
                        <div className="flex space-x-3">
                            <div>
                                <img
                                    loading="lazy"
                                    src={post?.user?.avatar?.url}
                                    alt={post?.user?.username}
                                    className="h-11 w-11 rounded-full " />
                            </div>
                            <div className="flex flex-col text-sm">
                                <div className="flex items-center space-x-1">
                                    <Link to={`/author/${post?.user?._id}`} className="hover:underline" >{post?.user?.username}</Link>
                                    <span>• {formatedDate}</span>
                                </div>
                                <Link to={`/posts/search?category=${post?.category?.name}`} className="mt-1 bg-blog w-fit text-white px-0.5 rounded-md hover:underline">{post?.category?.name}</Link>
                            </div>
                        </div>


                        <div className="relative ">
                            <FaEllipsisH onClick={() => toggleDropdown()} className="cursor-pointer" />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 border border-gray-300 rounded-lg shadow-lg bg-white" >
                                    <ul>
                                        <li className="cursor-pointer hover:bg-gray-100 p-2">Add to favorite</li>
                                        <li className="cursor-pointer hover:bg-gray-100 p-2">Save</li>
                                        <li className="cursor-pointer hover:bg-gray-100 p-2">Signaler</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* end of header */}

                    {/* CONTENT */}
                    <div className="">
                        <h4 className="my-4">
                            {post?.title}
                        </h4>
                        <img
                            src={post?.image?.url}
                            alt={post?.title}
                            className="w-full h-96 object-cover rounded-lg"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex space-x-2 justify-between my-3">
                        <div className="flex space-x-2">
                            <button className="inline-flex">
                                <FaThumbsUp className={`mr-0.5 text-blue-700`}
                                />
                                {post?.likes?.length || 0}
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEye /> <span>{post?.viewsCount || 0}</span>
                        </div>
                    </div>

                    <hr className="text-black" />

                    <div
                        className="mt-3 leading-7"
                        dangerouslySetInnerHTML={{ __html: post?.content }}
                    >
                    </div>
                </>
        }

    </main>
};

export default SinglePost;
