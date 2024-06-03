import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
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
    autoplaySpeed: 2500,
  };

  return (
    <div className="mb-2 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[35rem] lg:w-[40rem] md:w-[44rem] sm:w-[30rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-contain h-[15rem] sm:h-[18rem] md:h-[20rem]"
                />

                <div className="mt-2 flex justify-evenly">
                  <div className="one">
                    <h2 className="text-xs sm:text-sm md:text-base">{name}</h2>
                    <p className="text-xs sm:text-sm md:text-base">$ {price}</p>
                    <p className="w-[12rem] text-xs sm:text-sm md:text-base">
                      {description.substring(0, 70)} ...
                    </p>
                  </div>

                  <div className="flex justify-between w-[10rem] sm:w-[12rem] md:w-[14rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaStore className="mr-1 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaClock className="mr-1 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaStar className="mr-1 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaStar className="mr-1 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaShoppingCart className="mr-1 text-white" /> Qty:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-1 text-xs sm:text-sm md:text-base">
                        <FaBox className="mr-1 text-white" /> Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
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
