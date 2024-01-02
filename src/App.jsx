import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useState } from 'react'

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


// const queryClient = new QueryClient()


// pages
import PostsPage from "./pages/Posts"

// erros 
import {
  NotFound,
  Error
} from "./errors"
import Layout from "./pages/Layout";
import { SkeletonTheme } from "react-loading-skeleton";
import SinglePost from "./pages/SinglePost";


// infastructions


const router = createBrowserRouter([
  // *************HOME*****************
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />
      },
      {
        path: "/posts/:id",
        element: <SinglePost />
      },
    ]
  },
  // *************PROFILE (auth users) *****************


  // *************AUTH*****************

  // *************404*****************
  {
    path: "*",
    element: <NotFound />
  }
])

const App = () => {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           // staleTime: 1000 * 60 , // optionl
  //           // refetchOnMount: false,
  //           // refetchOnWindowFocus: false,
  //           // refetchOnReconnect: false, // Refetch on network reconnect
  //           // retry: 0, // 3 automatic retries
  //           // cacheTime: 1000 * 60 * 10, // 10 minutes
  //         },
  //       },
  //     })
  // );
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc" >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SkeletonTheme>
  )


};
// With SSR, we usually want to set some default staleTime
// above 0 to avoid refetching immediately on the client
export default App;
