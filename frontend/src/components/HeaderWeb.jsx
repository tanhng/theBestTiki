import React, { Component } from 'react'
//import hihi from '../static/image/138254.svg'
export default class HeaderWeb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: "",
            searchname: "",
            errMessage: "",
            loading: false
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            currentUser: window.localStorage.getItem("email")
        });
    }
    handleSearchNameChange = (event) => {
        this.setState({
            searchname: event.target.value
        })

    }
    handleSearch = (event) => {
        event.preventDefault();
        window.localStorage.setItem('searchname', this.state.searchname);
        window.location.href = "/search";
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            errMessage: "",
            loading: true
        });

        try {
            const data = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email.value,
                    password: this.pass.value
                }),
            }).then((res) => { return res.json(); });
            console.log(data);

            if (!data.success) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                //save data to localStorage
                window.localStorage.setItem("email", data.data.email);

                window.location.href = "/";
            }
        } catch (err) {
            this.setState({
                errMessage: err.message
            });
        } finally {
            this.setState({
                loading: false
            });
        }
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
                <header className="section-header">
                    <nav className="navbar navbar-top navbar-expand-lg navbar-dark bg-secondary">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarsExample07">
                                <ul className="navbar-nav mr-auto">
                                    <li><a href="#" className="nav-link"> <i className="fab fa-facebook"></i> </a></li>
                                    <li><a href="#" className="nav-link"> <i className="fab fa-instagram"></i> </a></li>
                                    <li><a href="#" className="nav-link"> <i className="fab fa-twitter"></i> </a></li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a href="#" className="nav-link" > Delivery </a></li>
                                    <li className="nav-item"><a href="#" className="nav-link" > Help </a></li>
                                    <li className="nav-item dropdown"><a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> USD </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li><a className="dropdown-item" href="#">EUR</a></li>
                                            <li><a className="dropdown-item" href="#">AED</a></li>
                                            <li><a className="dropdown-item" href="#">RUBL </a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown"><a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">   Language </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li><a className="dropdown-item" href="#">English</a></li>
                                            <li><a className="dropdown-item" href="#">Vietnamese</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <section className="header-main shadow-sm">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-sm-4">
                                    <div className="brand-wrap">
                                        <img className="logo" src="images/logo-girl.png" />
                                        <h2 className="logo-text">Teki</h2>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-5 col-sm-8">
                                    <form action="#" className="search-wrap">
                                        <div className="input-group w-100">
                                            <input type="text" className="form-control" style={{ width: "55%" }} placeholder="Search"
                                                value={this.state.searchname}
                                                onChange={this.handleSearchNameChange}
                                            />
                                            <select className="custom-select" name="category_name">
                                                <option value="">All type</option><option value="codex">Special</option>
                                                <option value="comments">Only best</option>
                                                <option value="content">Latest</option>
                                            </select>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit"
                                                    onClick={
                                                        this.handleSearch
                                                    }>
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-5 col-xl-4 col-sm-12">
                                    <div className="widgets-wrap float-right">
                                        <a href="#" className="widget-header mr-3" onClick={() => { window.location.href = '/cart' }}>
                                            <div className="icontext">
                                                <div className="icon-wrap"><i className="icon-sm round border fa fa-shopping-cart"></i></div>
                                                <div className="text-wrap">
                                                    <span className="small badge badge-danger">0</span>
                                                    <div>Cart</div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" className="widget-header mr-3">
                                            <div className="icontext">
                                                <div className="icon-wrap"><i className="icon-sm round border fa fa-heart"></i></div>
                                                <div className="text-wrap">
                                                    <small>Wish</small>
                                                    <div>List</div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="widget-header dropdown">
                                            <a href="#" data-toggle="dropdown" data-offset="20,10">
                                                <div className="icontext">
                                                    <div className="icon-wrap"><i className="icon-sm round border fa fa-user"></i></div>
                                                    {this.state.currentUser ? (
                                                        <div>
                                                            <small>Welcome</small>
                                                            <div>{this.state.currentUser} <i className="fa fa-caret-down"></i> </div>
                                                        </div>
                                                    ) : (
                                                            <div className="text-wrap">
                                                                <small>Sign in | Join</small>
                                                                <div>My account <i className="fa fa-caret-down"></i> </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </a>
                                            {this.state.currentUser ? (
                                                // Tao bai viet, nap tien, dang xuat
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item" href="/"
                                                        onClick={() => {
                                                            window.location.href = "/new-post"
                                                        }}>New Post</a>
                                                    <a className="dropdown-item" href="/payment">Payment</a>
                                                    <hr className="dropdown-divider" />
                                                    <a className="dropdown-item" href="/" onClick={this.handleLogout}>Log out</a>
                                                </div>
                                            ) : (
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <form className="px-4 py-3" onSubmit={this.handleFormSubmit}>
                                                            <div className="form-group">
                                                                <label>Email address</label>
                                                                <input type="email" className="form-control" placeholder="email@example.com"
                                                                    ref={input => { this.email = input }}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Password</label>
                                                                <input type="password" className="form-control" placeholder="Password"
                                                                    ref={input => { this.pass = input }}
                                                                    required
                                                                />
                                                            </div>
                                                            {this.state.errMessage ? (
                                                                <div className="alert alert-danger" role="alert">
                                                                    {this.state.errMessage}
                                                                </div>
                                                            ) : null}

                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                {this.state.loading ? (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                                                    )}
                                                            </div>
                                                        </form>
                                                        <hr className="dropdown-divider" />
                                                        <a className="dropdown-item" href="/register">Have account? Sign up</a>
                                                        <a className="dropdown-item" href="#">Forgot password?</a>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </header>
            </div>
        )
    }
}
