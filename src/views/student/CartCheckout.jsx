import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import UserData from "../plugin/UserData";
import useAxios from "../../utils/useAxios";

function CartCheckout() {
  const [checkout, setCheckOut] = useState([]);
  const user_id = UserData()?.user_id;
  const navigate = useNavigate();
  useEffect(() => {
    if (user_id) {
      fetchOrders();
    }
  }, [user_id]);

  const fetchOrders = async () => {
    try {
      const res = await useAxios().get(`/order/check-order/${user_id}`);
      setCheckOut(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const payNow = (orderID) => {
    navigate(`/checkout/${orderID}`);
  };
  return (
    <>
      <BaseHeader />
      <section className="pt-5 pb-5">
        <div className="container">
          <Header />
          <div className="row mt-0 mt-md-4">
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="card mb-4">
                <div className="table-responsive overflow-y-hidden">
                  <table className="table mb-0 text-nowrap table-hover table-centered">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Order Date</th>
                        <th>Initial Total</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkout?.map((order) => (
                        <tr key={order.oid}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="https://geeksui.codescandy.com/geeks/assets/images/course/course-wordpress.jpg"
                                alt="course"
                                className="rounded img-4by3-lg"
                                style={{
                                  width: "100px",
                                  height: "70px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="ms-3">
                                <h5 className="mb-1">
                                  <Link
                                    to="#"
                                    className="text-inherit text-decoration-none text-dark"
                                  >
                                    Order No: {order?.oid}
                                  </Link>
                                </h5>
                                
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mt-3">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </td>
                          <td>
                            <p className="mt-3">${order.initial_total}</p>
                          </td>
                          <td>
                            <p className="mt-3">${order.sub_total}</p>
                          </td>
                          <td>
                            <button onClick={()=>payNow(order?.oid)} className="btn btn-primary btn-sm mt-3">
                              Continue To Pay   <i className="fas fa-arrow-right"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {checkout.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No pending orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}

export default CartCheckout;
