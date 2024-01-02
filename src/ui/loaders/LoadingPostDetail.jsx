import Skeleton from 'react-loading-skeleton';

const LoadingPostsDetail = () => {
    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between">
                <div className="flex space-x-3">
                    <div>
                        <Skeleton circle width={20} height={20} />
                    </div>
                    <div className="flex flex-col text-sm">
                        <Skeleton width={50} />
                    </div>
                </div>


                <div className="relative ">
                    <Skeleton width={20} />
                </div>
            </div>

            {/* end of header */}

            {/* CONTENT */}
            <div className="">
                <h4 className="my-4">
                    <Skeleton width={100} />
                </h4>
                <Skeleton className='w-full h-96' />
            </div>

            <div className="flex space-x-2 justify-between my-3">
                <div className="flex space-x-2">
                    <Skeleton width={20} />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton width={20} />
                </div>
            </div>

            <hr className="text-black" />

            <div
                className="mt-3 leading-7"
            >
                <Skeleton className='w-full' />
                <Skeleton className='w-full' />
                <Skeleton className='w-full' />
            </div>
        </>
    );
};

export default LoadingPostsDetail;