import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  changeQuantity,
  deleteCartProduct,
  orderSubmit,
} from "../../redux/reducers/productReducer";

const Carts = () => {
  const { cartProducts } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const [order, setOrder] = useState();
  const dispatch = useDispatch();

  const orderProduct = () => {
    let arrOrders = cartProducts.map((prod) => {
      const productOrder = {
        // productDetail: {
        productId: String(prod.id),
        quantity: Number(prod.quantity),
        // },
      };
      return productOrder;
    });
    const data = {
      orderDetail: arrOrders,
      email: String(userLogin.email),
    };

    setOrder(data);
  };

  useEffect(() => {
    orderProduct();
  }, [cartProducts]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = orderSubmit(order);
    dispatch(action);
    alert("Thêm mới thành công!");
  };

  return (
    <>
      <div className="container-fluid">
        <h3>Carts</h3>
        <hr></hr>

        <table className="table">
          <thead style={{ border: "1px solid transparent" }}>
            <tr className="text-center">
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody
            className="text-center"
            style={{ border: "1px solid transparent" }}
          >
            {cartProducts.map((prod, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td name="productId">{prod.id}</td>
                  <td>
                    <img src={prod.image} width={50} alt="..." />
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        const itemQuantity = {
                          id: prod.id,
                          quantity: 1,
                        };
                        dispatch(changeQuantity(itemQuantity));
                      }}
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                    <span className="cart-quantity" name="quantity">
                      {prod.quantity}
                    </span>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const itemQuantity = {
                          id: prod.id,
                          quantity: -1,
                        };
                        dispatch(changeQuantity(itemQuantity));
                      }}
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </td>
                  <td>{prod.quantity * prod.price}</td>
                  <td>
                    <button className="btn btn-success">EDIT</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const action = deleteCartProduct(prod.id);
                        dispatch(action);
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot style={{ border: "1px solid transparent" }}>
            <tr>
              <td colspan="8" className="text-end">
                <button
                  className="btn btn-warning"
                  type="submit"
                  onClick={handleSubmit}
                >
                  SUBMIT ORDER
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Carts;
