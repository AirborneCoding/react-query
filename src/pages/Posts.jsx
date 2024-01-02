import React from "react";
import DataItemsGrid from "../components/Items";
import { useFetchPosts } from "../hooks/useFetchPosts";
import LoadingPosts from "../ui/loaders/LoadingPosts";

const Posts = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        ref,
        hasNextPage,
    } = useFetchPosts()

    if (isLoading) {
        return <LoadingPosts cards={4} />
    }
    if (isError) {
        return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
    }

    const _posts = data?.pages?.flatMap((page) => page);


    return <main className="body-container">

        {/* {
            isLoading && <LoadingPosts cards={4} />
        } */}
        <section className="grid lg:grid-cols-2 gap-10 " >
            {_posts?.map((post, i) => (
                <React.Fragment key={post._id}>
                    <DataItemsGrid  {...post} />
                    {i === _posts.length - 1 && <div ref={ref}></div>}
                </React.Fragment>
            ))}
        </section>
        {isFetchingNextPage
            ? <LoadingPosts cards={2} style={{ margin: '1rem' }} />
            : hasNextPage
        }

    </main >;
};

export default Posts;


/* 
        // <button
        //     className="btn btn-ghost"
        //     onClick={() => fetchNextPage()}
        //     disabled={isFetchingNextPage}>
        //     {isFetchingNextPage
        //         ? <LoadingPosts cards={2} style={{ margin: '1rem' }} />
        //         : hasNextPage
        //             ? null
        //             : null}
        // </button>
*/