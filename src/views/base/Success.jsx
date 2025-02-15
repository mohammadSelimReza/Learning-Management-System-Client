import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'

function Success() {
    const [searchParams] = useSearchParams(); // Get query params

    const transactionId = searchParams.get('tran_id'); // Get transaction ID
    return (
        
        <>
            <BaseHeader />

            <section className="pt-0 mh-100  position-relative overflow-hidden my-auto">
                <p>{transactionId} </p>
                <div className="container position-relative">
                    <div className="row g-5 align-items-center justify-content-center">
                        <div className="col-lg-5">
                            <h1 className="text-success">Enrollment Successful!</h1>
                            <p> Hey there, you enrollment in the 2 courses where successful, visit your <a className="primary-text" href="#">My Courses</a> page, to view the courses now.</p>
                        </div>
                        <div className="col-lg-7 text-center">
                            <img src="https://assets.materialup.com/uploads/bc4c9683-f623-42ef-9014-464ba0411c79/preview.png" className="h-300px h-sm-400px h-md-500px h-xl-700px" alt="" />
                        </div>
                    </div>
                </div>
            </section>


            <BaseFooter />
        </>
    )
}

export default Success