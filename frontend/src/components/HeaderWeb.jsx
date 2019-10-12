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
                <header class="section-header">
                    <nav class="navbar navbar-top navbar-expand-lg navbar-dark bg-secondary">
                        <div class="container">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarsExample07">
                                <ul class="navbar-nav mr-auto">
                                    <li><a href="#" class="nav-link"> <i class="fab fa-facebook"></i> </a></li>
                                    <li><a href="#" class="nav-link"> <i class="fab fa-instagram"></i> </a></li>
                                    <li><a href="#" class="nav-link"> <i class="fab fa-twitter"></i> </a></li>
                                </ul>
                                <ul class="navbar-nav">
                                    <li class="nav-item"><a href="#" class="nav-link" > Delivery </a></li>
                                    <li class="nav-item"><a href="#" class="nav-link" > Help </a></li>
                                    <li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> USD </a>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a class="dropdown-item" href="#">EUR</a></li>
                                            <li><a class="dropdown-item" href="#">AED</a></li>
                                            <li><a class="dropdown-item" href="#">RUBL </a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">   Language </a>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a class="dropdown-item" href="#">English</a></li>
                                            <li><a class="dropdown-item" href="#">Vietnamese</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <section class="header-main shadow-sm">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-3 col-sm-4">
                                    <div class="brand-wrap">
                                        <img class="logo" src="images/logo-dark.png" />
                                        <h2 class="logo-text">LOGO</h2>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-xl-5 col-sm-8">
                                    <form action="#" class="search-wrap">
                                        <div class="input-group w-100">
                                            <input type="text" class="form-control" style={{ width: "55%" }} placeholder="Search"
                                                value={this.state.searchname}
                                                onChange={this.handleSearchNameChange}
                                            />
                                            <select class="custom-select" name="category_name">
                                                <option value="">All type</option><option value="codex">Special</option>
                                                <option value="comments">Only best</option>
                                                <option value="content">Latest</option>
                                            </select>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="submit"
                                                    onClick={
                                                        this.handleSearch
                                                    }>
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-lg-5 col-xl-4 col-sm-12">
                                    <div class="widgets-wrap float-right">
                                        <a href="#" class="widget-header mr-3" onClick={() => { window.location.href = '/cart' }}>
                                            <div class="icontext">
                                                <div class="icon-wrap"><i class="icon-sm round border fa fa-shopping-cart"></i></div>
                                                <div class="text-wrap">
                                                    <span class="small badge badge-danger">0</span>
                                                    <div>Cart</div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="widget-header mr-3">
                                            <div class="icontext">
                                                <div class="icon-wrap"><i class="icon-sm round border fa fa-heart"></i></div>
                                                <div class="text-wrap">
                                                    <small>Wish</small>
                                                    <div>List</div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="widget-header dropdown">
                                            <a href="#" data-toggle="dropdown" data-offset="20,10">
                                                <div class="icontext">
                                                    <div class="icon-wrap"><i class="icon-sm round border fa fa-user"></i></div>
                                                    {this.state.currentUser ? (
                                                        <div>
                                                            <small>Welcome</small>
                                                            <div>{this.state.currentUser} <i class="fa fa-caret-down"></i> </div>
                                                        </div>
                                                    ) : (
                                                            <div class="text-wrap">
                                                                <small>Sign in | Join</small>
                                                                <div>My account <i class="fa fa-caret-down"></i> </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </a>
                                            {this.state.currentUser ? (
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <a class="dropdown-item" href="/"
                                                        onClick={() => {
                                                            window.location.href = "/new-post"
                                                        }}>New Post</a>
                                                    <hr class="dropdown-divider" />
                                                    <a class="dropdown-item" href="/" onClick={this.handleLogout}>Log out</a>
                                                </div>
                                            ) : (
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <form class="px-4 py-3" onSubmit={this.handleFormSubmit}>
                                                            <div class="form-group">
                                                                <label>Email address</label>
                                                                <input type="email" class="form-control" placeholder="email@example.com"
                                                                    ref={input => { this.email = input }}
                                                                    required
                                                                />
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Password</label>
                                                                <input type="password" class="form-control" placeholder="Password"
                                                                    ref={input => { this.pass = input }}
                                                                    required
                                                                />
                                                            </div>
                                                            {this.state.errMessage ? (
                                                                <div class="alert alert-danger" role="alert">
                                                                    {this.state.errMessage}
                                                                </div>
                                                            ) : null}

                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                {this.state.loading ? (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                        <button type="submit" class="btn btn-primary">Sign in</button>
                                                                    )}
                                                            </div>
                                                        </form>
                                                        <hr class="dropdown-divider" />
                                                        <a class="dropdown-item" href="/register">Have account? Sign up</a>
                                                        <a class="dropdown-item" href="#">Forgot password?</a>
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
