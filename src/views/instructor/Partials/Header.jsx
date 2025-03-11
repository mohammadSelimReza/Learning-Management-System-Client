import React from 'react'
import UserData from '../../plugin/UserData'
import { Link } from 'react-router';

function Header() {
    const user = UserData();
    return (
        <div className="row align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="card px-4 pt-2 pb-4 shadow-sm rounded-3">
                    <div className="d-flex align-items-end justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                                <img src={user?.image} className="avatar-xl rounded-circle border border-4 border-white" alt="avatar" style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
                            </div>
                            <div className="lh-1">
                                <h2 className="mb-0"> {user?.full_name} </h2>
                                <p className="mb-0 d-block">@{user?.username}</p>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex">
                                <Link to='/instructor/course/create' className="btn btn-main btn-sm d-none d-md-block ms-2" > Create New Course <i className='fas fa-plus'></i></Link>
                                <Link to='/instructor/profile/' className="btn btn-success btn-sm d-none d-md-block ms-2" > Setting <i className='fas fa-gear'></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header