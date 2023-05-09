import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { renderHistoryProduct } from "../../redux/reducers/productReducer";

const OrderHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { historyProduct } = useSelector((state) => state.productReducer);
  console.log(historyProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = renderHistoryProduct();
    dispatch(action);
  }, []);
  return (
    <div>
      {historyProduct.map((product, index) => {
        return (
          <div key={index}>
            <p>Order have been placed on: {product.date}</p>
            <table className="table m-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {product.orderDetail?.map((prod, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>
                        <img src={prod.image} width={50} alt="" />
                      </td>
                      <td>{prod.price}</td>
                      <td>{prod.quantity}</td>
                      <td>{prod.price * prod.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
export default OrderHistory;
