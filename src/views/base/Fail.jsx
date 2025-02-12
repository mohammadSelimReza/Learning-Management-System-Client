import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'

function Fail() {
    const [searchParams] = useSearchParams(); // Get query params

    const transactionId = searchParams.get('tran_id'); // Get transaction ID
    return (
        
        <>
            <BaseHeader />

            <section className="pt-0  position-relative overflow-hidden my-auto">
                <p>{transactionId} </p>
                <div className="container position-relative">
                    <div className="row g-5 align-items-center justify-content-center">
                        {/* Failed */}
                        <div className="col-lg-5">
                            <h1 className="text-danger">Payment Failed 😔</h1>
                            <p>Unfortunately, phew! Your payment did not go through. <br /> Please try again.</p>
                            <button type="button" className="btn btn-danger mb-0 rounded-2">Try again <i className='fas fa-repeat'></i></button>

                        </div>
                        <div className="col-lg-7 text-center">
                            <img sty src="https://media3.giphy.com/media/h4OGa0npayrJX2NRPT/giphy.gif?cid=790b76117pc6298jypyph0liy6xlp3lzb7b2y405ixesujeu&ep=v1_stickers_search&rid=giphy.gif&ct=e" className="h-300px h-sm-400px h-md-500px h-xl-700px" alt="" />
                        </div>
                    </div>
                </div>
            </section>


            <BaseFooter />
        </>
    )
}

export default Fail