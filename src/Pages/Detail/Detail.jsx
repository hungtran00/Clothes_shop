import React from "react";
import "../../assets/css/Detail.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getProductDetailApi,
  increaseQuantity,
} from "../../redux/reducers/productReducer";
import ShoeCard from "../../Components/ShoeCard/ShoeCard";
import { addCartProduct } from "../../redux/reducers/productReducer";
import { number } from "yup";

const Detail = () => {
  const { productDetail, numberQuantity } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const actionAsync = getProductDetailApi(params.id);
    dispatch(actionAsync);
  }, [params.id]);

  const handleCart = (item) => {
    const productCart = { ...item, quantity: Number(numberQuantity) };
    const action = addCartProduct(productCart);
    dispatch(action);
  };

  return (
    <div className="container">
      <div className="row product-detail">
        <div className="col-5 product-img">
          <div className="img-trainer">
            <img src={productDetail.image} alt="logo" className="w-100" />
          </div>
        </div>
        <div className="col-7 product-describe">
          <div className="describe">
            <h1>{productDetail.name}</h1>
            <p>{productDetail.description}</p>
            <h3>Available size</h3>
            <div className="size">
              {productDetail.size?.map((item, index) => {
                return (
                  <button className="btn-size" key={index}>
                    {item}
                  </button>
                );
              })}
            </div>
            <h2>{productDetail.price}$</h2>
            <div className="btn-quantity">
              <button
                className="plus"
                onClick={() => {
                  const itemQuantity = {
                    quantity: 1,
                  };
                  dispatch(increaseQuantity(itemQuantity));
                }}
              >
                +
              </button>
              <input
                type="number"
                value={numberQuantity}
                class="input"
                id="quantity"
              />
              <button
                className="minus"
                onClick={() => {
                  const itemQuantity = {
                    quantity: -1,
                  };
                  dispatch(increaseQuantity(itemQuantity));
                }}
              >
                -
              </button>
            </div>
            <div>
              <button
                className="btn-add-cart"
                onClick={() => {
                  handleCart(productDetail);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <h1 className="related-prod text-center">-Related Product-</h1>
        <div className="row">
          {productDetail.relatedProducts?.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-4 col-xl-4 col-xs-4" key={index}>
                <ShoeCard prod={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
