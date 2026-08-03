import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <a className="navbar-brand fw-bold" href="#">
                   Radhe Electronics Store
                </a>

                <form className="d-flex w-50">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search Products"
                    />
                </form>

                <div className="d-flex">
                    <button className="btn btn-light me-2">
					<Link
					      to="/login"
						  className="btn btn-light me-2"
								    >
						  Login
				    </Link>
                    </button>

                    <button className="btn btn-warning">
                        🛒 Cart
                    </button>
                </div>

            </div>
			
        </nav>
    );
	
	
}

export default Navbar;