
import { useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import { customFetch } from "../utils";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom"
function useQueryParams() {
    return new URLSearchParams(useLocation().search);
}

export const useFetchPosts = () => {

    const LIMIT = 4;
    const queryKey = "posts";

    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const response = await customFetch.get(
                    `/posts?page=${pageParam}&pageSize=${LIMIT}`
                );
                return response.data.posts;
            } catch (error) {
                // console.log("aaa", error);
            }
        },
        getNextPageParam: (_, pages) => {
            return pages.length + 1;
        },
        // staleTime: 1000 * 60 * 5
        // refetchInterval: 1000  //(fetch every second)
    });

    const lastPostRef = useRef(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage();
    }, [entry]);

    useEffect(() => {
        // Cache the initial data
        if (data) {
            queryClient.setQueryData([queryKey], data);
        }
    }, [data, queryClient, queryKey]);

    useEffect(() => {
        // Clean up cache after unmounting
        return () => {
            queryClient.removeQueries([queryKey]);
        };
    }, [queryClient, queryKey]);


    return {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        ref,
        hasNextPage,
    };
};

export const useFetchSinglePost = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const response = await customFetch.get(`posts/${id}`);
            return response.data;
        },
    });

    // Cache the initial data
    // if (data) {
    //     queryClient.setQueryData(["post", id], data);
    // }

    return {
        post: data,
        isLoading,
        isError,
        error,
    };
};





