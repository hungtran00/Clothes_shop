import axios from "axios";
import { result } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/Search.css";
import ShoeCard from "../../Components/ShoeCard/ShoeCard";
import { ACCESS_TOKEN, getStore } from "../../util/config";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let keyword = useRef();
  let [arrProduct, setArrProduct] = useState([]);
  const handleChange = (e) => {
    let value = e.target.value;
    keyword.current = value;
  };
  const callApiProduct = async () => {
    let tuKhoa = searchParams.get("keyword");
    let result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${tuKhoa}`,
      method: "GET",
    });
    let array = result.data.content;

    setArrProduct(array);
  };
  useEffect(() => {
    if (searchParams.get("keyword")) {
      callApiProduct();
    }
  }, [searchParams.get("keyword")]);

  const handleSearch = () => {
    setSearchParams({
      keyword: keyword.current,
    });
  };
  const handleSort = (e) => {
    let value = e.target.value;
    console.log(value);
    let resultSort = _.orderBy(arrProduct, ["price"], [value]);
    setArrProduct(resultSort);
  };

  return (
    <>
      <div className="search">
        <div className=" d-flex">
          <div className="form-group search-input">
            <label for="keyword">Search</label>

            <input
              type="text"
              className="form-control"
              id="keyword"
              style={{ width: "550px" }}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-search"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="search-content">
        <h1>Search</h1>
        <div>
          <div className="search-sort form-group ">
            <p>Price</p>
            <select id="sort" onChange={handleSort}>
              <option value="sort" selected>
                Sort
              </option>
              <option value="desc" name="desc">
                Decrease
              </option>
              <option value="asc" name="asc">
                Ascending
              </option>
            </select>
          </div>
          <div className="search-product">
            <div className="row">
              {arrProduct.map((item) => {
                return (
                  <div className="col-lg-4 col-md-4 col-xl-4 col-xs-4">
                    <ShoeCard prod={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
