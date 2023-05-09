import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeCard from "../../Components/ShoeCard/ShoeCard";
import { renderFavProduct } from "../../redux/reducers/productReducer";

const Favourite = () => {
  const dispatch = useDispatch();
  const { arrFavouriteProduct } = useSelector((state) => state.productReducer);
  useEffect(() => {
    let actionFavProduct = renderFavProduct();
    dispatch(actionFavProduct);
  }, [arrFavouriteProduct]);

  const renderFavProducts = () => {
    return arrFavouriteProduct.map((item) => {
      return (
        <div className="col-4">
          <ShoeCard prod={item} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="wrap-item row">{renderFavProducts()}</div>
    </>
  );
};

export default Favourite;
