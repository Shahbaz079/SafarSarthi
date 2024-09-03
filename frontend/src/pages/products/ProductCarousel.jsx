import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../Components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block mx-[4rem]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[30vw]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block "
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              discription,
              
              createdAt,
              numReviews,
              rating,
              passengers,
              
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[15rem]"
                />

                <div className="mt-4 w-full flex justify-between h-[12rem]">
                  <div className="one w-[40%] flex flex-col justify-normal items-left"> 
                    <h2 className="p-1 text-cyan-500 font-semibold text-lg text-left">{name}  </h2>
                    <p className="p-1"> Rs.{price}</p> <br />
                    <p className="w-[10rem] text-white">
                      <span className="text-cyan-400">Description:</span>
                      {discription.substring(0,100)}... 
                    </p>
                  </div>

                  <div className="flex flex-col bg-slate-600 rounded-lg justify-between w-[60%] ">
                   
                     
                      <h1 className="ml-2 mt-2">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="ml-2 mt-2">
                        <FaStar className="mr-2 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                   

                   
                      <h1 className="ml-2 mt-2">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="ml-2 mt-2">
                        <FaShoppingCart className="mr-2 text-white" /> Max-Passengers:{" "}
                        {passengers}
                      </h1>
                     
                  </div>
                </div>   
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;