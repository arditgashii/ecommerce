import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import Product from './Products/Product';
import './Home.css';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="special-products-section">
            <h1 className="special-products-heading">Special Products</h1>
            <Link to="/shop" className="shop-link">
              Shop
            </Link>
          </div>

          <div className="product-container">
            {data.products.map((product) => (
              <div key={product._id} className="product">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
