import React from "react";
import "../../assets/css/Home.css";
import ShoeCard from "../../Components/ShoeCard/ShoeCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductApi,
  renderFavProduct,
} from "../../redux/reducers/productReducer";
import { useEffect } from "react";
const Home = () => {
  const { arrProduct } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const getAllProductApi = async () => {
    const action = getProductApi();
    dispatch(action);
  };
  useEffect(() => {
    getAllProductApi();
  }, []);

  return (
    <>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row carousel-content">
                <div className="col-lg-7 col-md-7 col-xl-7 col-xs-7 trainer">
                  <div className="img-product">
                    <img src={arrProduct[0]?.image} alt="" />
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-xl-5 col-xs-5 prodName">
                  <div className="prodName-content">
                    <h2>{arrProduct[0]?.name}</h2>
                    <h3>{arrProduct[0]?.description}</h3>
                    <div className="btn-buy">
                      <button>Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row carousel-content">
                <div className="col-lg-7 col-md-7 col-xl-7 col-xs-7 trainer">
                  <div className="img-product">
                    <img src={arrProduct[1]?.image} alt="" />
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-xl-5 col-xs-5 prodName">
                  <div className="prodName-content">
                    <h2>{arrProduct[1]?.name}</h2>
                    <h3>{arrProduct[1]?.description}</h3>
                    <div className="btn-buy">
                      <button>Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row carousel-content">
                <div className="col-lg-7 col-md-7 col-xl-7 col-xs-7 trainer">
                  <div className="img-product">
                    <img src={arrProduct[2]?.image} alt="" />
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-xl-5 col-xs-5 prodName">
                  <div className="prodName-content">
                    <h2>{arrProduct[2]?.name}</h2>
                    <h3>{arrProduct[2]?.description}</h3>
                    <div className="btn-buy">
                      <button>Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <img src="./image/Polygon 2.png" alt="" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <img src="./image/Polygon 1.png" alt="" />
          </button>
        </div>
        <div className="pt-5 product-content">
          <div className="product-feature">
            <h1>Product Feature</h1>
          </div>

          <div className="row">
            {arrProduct.map((item, index) => {
              return (
                <div
                  className="col-lg-4 col-md-4 col-xl-4 col-xs-4"
                  key={index}
                >
                  <ShoeCard prod={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
