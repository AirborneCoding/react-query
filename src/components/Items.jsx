import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom';

const DataItemsGrid = (props) => {


    return <div key={props?._id} className="card card-compact bg-base-100 shadow-xl">
        <img src={props?.image?.url} alt={props?.title} className="w-full h-56 object-cover" loading="lazy" />

        <div className="card-body justify-between">

            <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center lg:space-y-0 space-y-2">
                <div className="text-base bg-gray-500 text-white rounded my-2 px-0.5 tracking-wider hover:underline">{props?.category?.name}</div>
                <div className="flex items-center">
                    <div

                        className="hover:underline flex space-x-1 items-center">
                        <figure>
                            <img
                                loading="lazy"
                                src={props?.user?.avatar?.url} alt={props?.title} className="w-8 h-8 object-cover rounded-full"
                            /></figure>
                        <span>{props?.user?.username}</span>
                    </div>{" . "}

                </div>
            </div>

            <div>
                <div >
                    <h4 className="card-title hover:underline font-bold text-base">
                        <Link to={`/posts/${props._id}`}>
                            {props?.title}
                        </Link>
                    </h4>
                    <hr />
                    <p className="pt-2" dangerouslySetInnerHTML={{ __html: props?.content.substring(0, 100) }} />
                </div>
            </div>
        </div>
    </div>

};
export default DataItemsGrid;

