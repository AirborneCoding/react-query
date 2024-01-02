/* import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { customFetch } from "../utils"
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from "react";


// fetch posts
export const useFetchPosts = () => {
    const queryKey = "posts";
    const queryClient = useQueryClient();
    const LIMIT = 4;

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await customFetch.get(
                `/posts?page=${pageParam}&pageSize=${LIMIT}`
            );
            return response.data.posts
        },
        getNextPageParam: (_, pages) => {
            return pages.length + 1;
        },
    });

    const lastPostRef = useRef(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })

    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage()
    }, [entry])

    // cache
    useEffect(() => {
        // Cache the initial data
        if (data) {
            queryClient.setQueryData([queryKey], data);
        }
    }, [data, queryClient, queryKey]);

    return {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        ref,
        hasNextPage,
    }
};

export default useFetchPosts; */


//! v2
