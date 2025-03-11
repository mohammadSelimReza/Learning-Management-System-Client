import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import useAxios from '../../utils/useAxios'
import CartID from '../plugin/CartID'
import Toast from '../plugin/Toast'
import { CartContext } from '../plugin/useContext'
import UserData from '../plugin/UserData'
import { OrbitProgress } from 'react-loading-indicators'

function Cart() {
    const user_id = UserData()?.user_id;
    const user_name = UserData()?.full_name;
    const user_email = UserData()?.email;
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const [cartCount, setCartCount] = useContext(CartContext)
    const [loading,setLoading] = useState(true)
    const [processing,setProcessing] = useState(true)
    const navigate = useNavigate();
    const fetchCart = async () => {
        setLoading(true)
        try {
            const res = await useAxios().get(`/course/cart/${CartID()}/`)
            setCart(res.data)
            setCartCount(res.data.length)
            const resState = await useAxios().get(`/course/cart/stat/${CartID()}/`)
            setCartItem(resState.data.status)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const cartItemDelete = async (cartID, itemId) => {
        setLoading(true)
        await useAxios().delete(`/course/cart/${cartID}/${itemId}/`)
            .then((res) => {
                fetchCart();
                Toast().fire({
                    icon: "success",
                    title: "cart item deleted",
                })
                setLoading(false)
            });
    }
    useEffect(() => {
        fetchCart()
        setName(user_name);
        setEmail(user_email);
    }, [])
    const createOrder = async (e) => {
        setProcessing(true)
        e.preventDefault();

        const formData = {
            full_name: name,
            email: email,
            country: country,
            phone:phone,
            cart_id: CartID(),
            user_id: user_id,
        };
        console.log(JSON.stringify(formData))
        try {
            const res = await useAxios().post("/order/create-order/", formData);
            const orderID = res.data?.order_oid;
            localStorage.setItem("order_oid", orderID);
            Toast().fire({
                icon: "success",
                title: res.data?.message || "Order created successfully! and Deleted from cart",
            });
            fetchCart();
            setProcessing(false)
            if (orderID) {
                navigate(`/checkout/${orderID}`);
            }
        } catch (error) {
            console.error("Order creation failed:", error);
            setProcessing(false)
        }
    };


    return (
        <>
            <BaseHeader />

            {
                loading ?
                (<div className="text-center">
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
                    </div> )
                :
                (
                    <>
                    <section className="py-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bg-light p-4 text-center rounded-3">
                                <h1 className="m-0">My cart</h1>
                                {/* Breadcrumb */}
                                <div className="d-flex justify-content-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb breadcrumb-dots mb-0">
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Home</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Courses</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Cart
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5">
                <div className="container">
                    <form onSubmit={createOrder} >
                        <div className="row g-4 g-sm-5">
                            {/* Main content START */}
                            <div className="col-lg-8 mb-4 mb-sm-0">
                                <div className="p-4 shadow rounded-3">
                                    <h5 className="mb-0 mb-3">Cart Items {cart?.length || 0} </h5>

                                    <div className="table-responsive border-0 rounded-3">
                                        <table className="table align-middle p-4 mb-0">
                                            <tbody className="border-top-2">
                                                {
                                                    cart?.map((cartItem) => <tr key={cartItem?.cart_no}>
                                                        <td>
                                                            <div className="d-lg-flex align-items-center">
                                                                <div className="w-100px w-md-80px mb-2 mb-md-0">
                                                                    <img src={cartItem?.course?.image} style={{ width: "100px", height: "70px", objectFit: "cover" }} className="rounded" alt="" />
                                                                </div>
                                                                <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                                                    <a href="#" className='text-decoration-none text-dark' >{cartItem?.course?.title} </a>
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <h5 className="text-success mb-0">${cartItem?.course?.price} </h5>
                                                        </td>
                                                        <td>
                                                            <button type='button' onClick={() => cartItemDelete(CartID(), cartItem?.course?.course_id)} className="btn btn-sm btn-danger px-2 mb-0">
                                                                <i className="fas fa-fw fa-times" />
                                                            </button>
                                                        </td>
                                                    </tr>)
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Personal info START */}
                                <div className="shadow p-4 rounded-3 mt-5">
                                    {/* Title */}
                                    <h5 className="mb-0">Personal Details</h5>
                                    {/* Form START */}
                                    <div className="row g-3 mt-0">
                                        {/* Name */}
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="yourName" className="form-label">
                                                Your name *
                                            </label>
                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                className="form-control"
                                                id="yourName"
                                                value={name}
                                            />
                                        </div>
                                        {/* Email */}
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="emailInput" className="form-label">
                                                Email address *
                                            </label>
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                className="form-control"
                                                id="emailInput"
                                                value={user_email}
                                            />
                                        </div>
                                        {/* phone */}
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="phoneInput" className="form-label">
                                                Phone *
                                            </label>
                                            <input
                                                onChange={(e) => setPhone(e.target.value)}
                                                type="number"
                                                className="form-control"
                                                id="phoneInput"
                                                placeholder="number"
                                            />
                                        </div>

                                        {/* Country option */}
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="mobileNumber" className="form-label">
                                                Select country *
                                            </label>
                                            <input
                                                onSelect={(e) => setCountry(e.target.value)}
                                                type="text"
                                                className="form-control"
                                                id="mobileNumber"
                                                placeholder="Country"
                                            />
                                        </div>

                                    </div>
                                    {/* Form END */}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="p-4 shadow rounded-3">
                                    <h4 className="mb-3">Cart Total</h4>
                                    <ul class="list-group mb-3">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Sub Total
                                            <span>${cartItem?.price?.toFixed(2)}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Tax
                                            <span>${cartItem?.tax?.toFixed(2)}</span>
                                        </li>
                                        <li class="list-group-item d-flex fw-bold justify-content-between align-items-center">
                                            Total
                                            <span className='fw-bold'>${cartItem?.total?.toFixed(2)}</span>
                                        </li>
                                    </ul>
                                    <div className="d-grid">
                                       {
                                        !processing ?
                                        <button type='submit' className="btn btn-lg btn-success" disabled={true}>Processing...</button>
                                        :
                                        <button type='submit' className="btn btn-lg btn-success">Checkout</button>

                                       }
                                    </div>
                                    <p className="small mb-0 mt-2 text-center">
                                        By proceeding to checkout, you agree to these{" "}<a href="#"> <strong>Terms of Service</strong></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
                    </>
                )
            }

            <BaseFooter />
        </>
    )
}

export default Cart