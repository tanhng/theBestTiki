import React, { Component } from 'react'

export default class HeaderWeb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: "",
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            currentUser: window.localStorage.getItem("email")
        });
    }

    handleLogout = async () => {
        // console.log("object")
        const data = await fetch("http://localhost:5000/user/logout")
            .then((res) => { return res.json(); });
        if (data.success) {
            window.localStorage.clear();
            this.setState({
                currentUser: ""
            });
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="second-line row">
                            <div className="col-2">
                                {/* Logo */}
                                <a className="logo navbar-brand font-weight-bold" href="/">Teki </a>
                            </div>
                            <div className="search-bar col-5">
                                {/* Search Bar */}
                                <form className="form-inline">
                                    <input className="form-control" type="text" placeholder="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                            <div className="small-navbar col-5">
                                {/* Toggle button -> */}
                                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                {/* <- Collabse bar */}
                                <div className="collapse navbar-collapse" id="collapsibleNavId">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Cart</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Mark up</a>
                                        </li>
                                        {this.state.currentUser ? (
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <strong>{this.state.currentUser}</strong>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item" href="#">Profile</a>
                                                    <a className="dropdown-item" href="#">My Shop</a>
                                                    <a className="dropdown-item" href="/new-post"
                                                        style={{ color: "crimson" }}
                                                    >New post</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="/"
                                                        onClick={this.handleLogout}
                                                        style={{
                                                            color: "blue"
                                                        }}
                                                    >Logout</a>
                                                </div>
                                            </li>
                                        ) : (
                                                <div>
                                                    <li className="nav-item active">
                                                        {/* FIXME: Lam th nao de active khi nhay trang */}
                                                        <a className="nav-link" href="/register">Register </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="/login">Login </a>
                                                    </li>
                                                </div>
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="third-line row">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Category</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                                        <a className="dropdown-item" href="#">Boy</a>
                                        <a className="dropdown-item" href="#">Gay</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div >
        )
    }
}
