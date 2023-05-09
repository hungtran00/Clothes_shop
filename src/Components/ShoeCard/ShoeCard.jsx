import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/ShoeCard.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLike,
  likeProductApi,
  renderFavProduct,
} from "../../redux/reducers/productReducer";
import axios from "axios";
import { ACCESS_TOKEN, getStore } from "../../util/config";
import { set } from "lodash";
const ShoeCard = ({ prod }) => {
  let likeProduct = async (id) => {
    let result = await axios({
      url: `https://shop.cyberlearn.vn/api/Users/like?productId=${id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
  };

  let unLikeProduct = async (id) => {
    let result = await axios({
      url: `https://shop.cyberlearn.vn/api/Users/unlike?productId=${id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
  };
  const dispatch = useDispatch();
  let [like, setLike] = useState();
  const { arrFavouriteProduct } = useSelector((state) => state.productReducer);

  useEffect(() => {
    let findIndex = -1;
    let indexFav = arrFavouriteProduct.findIndex((item) => {
      return item.id === prod.id;
    });
    findIndex = indexFav;
    if (findIndex !== -1) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  const handleLike = () => {
    if (!like) {
      likeProduct(prod.id);
      let actionFavProduct = renderFavProduct();
      dispatch(actionFavProduct);
    } else {
      unLikeProduct(prod.id);
      let actionFavProduct = renderFavProduct();
      dispatch(actionFavProduct);
    }
  };

  const renderLike = () => {
    if (like) {
      return <p className="icon-like">❤️</p>;
    }
    return <p className="icon-unlike" >♡</p>;
  };
  return (
    <>
      <div className="product-item">
        <button
          className="btn-like"
          onClick={() => {
            setLike(!like);
            handleLike();
          }}
        >
          {renderLike()}
        </button>
        <NavLink to={`/detail/${prod.id}`}>
          <div className="product-img">
            <img className="w-100" src={prod.image} />
          </div>
          <div className="product-desc">
            <h5>{prod.name}</h5>
            <p>
              {prod.description?.length > 50
                ? prod.description.substr(0, 50) + " ..."
                : prod.description}
            </p>
          </div>
        </NavLink>
        <div className="product-btn">
          <NavLink to={`/detail/${prod.id}`} className="btn-buy">
            Buy now
          </NavLink>
          <NavLink to={`/detail/${prod.id}`} className="btn-price">
            {prod.price}$
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ShoeCard;
