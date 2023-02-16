import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams,Link, useHistory} from "react-router-dom"
import Search from "./Search";
// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

const Products = () => {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
const params=useParams()
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const [sort, setSort] =useState("")
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
   const [keywords, setKeyword] = useState("");
 
  const keyword = params.keyword; //this is for params search for /:keyword
const history = useHistory();
const searchSubmitHandler = (e) => {
  e.preventDefault();
  if (keywords.trim()) {
    history.push(`/products/${keywords}`);
  } else {
    history.push("/products");
  }
};
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings, sort));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error,sort]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />

          {/* <div className="searchBoxx">
            <input
              type="text"
              placeholder="Search a Product ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </div> */}
          <form className="searchBoxInProduct" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products?.length <= 0 ? (
             <h1>404 NOT FOUND!</h1>
            ) : (
              
                products?.map((product) => (
                <ProductCard key={product._id} product={product} />
                ))
            
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <div className="row sort">
              <span>Sort By: </span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Newest</option>
                <option value="name">name</option>
                <option value="-Stock">stock</option>
                <option value="-ratings">ratings</option>
                <option value="-price">High-Low Price</option>
                <option value="price">Low-High Price</option>
              </select>
            </div>
            <Typography>
              <Link to="/">Categories</Link>
            </Typography>
            <ul className="categoryBox">
              {categories &&
                categories.map((category) => (
                  <li
                    className="category-link"
                    key={category._id}
                    onClick={() => setCategory(category.name)}
                  >
                    {category.name}
                  </li>
                ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage <= count && ( //condition create by me
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Products
