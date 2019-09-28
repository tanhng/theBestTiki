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
        const data = await fetch("http://localhost:3001/users/logout")
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
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <a className="navbar-brand" href="/">Teki </a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        {this.state.currentUser ? (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    Welcome <strong>{this.state.currentUser}, </strong>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={this.handleLogout}>Log out! </a>
                                </li>
                            </ul>
                        ) : (
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        {/* FIXME: Lam th nao de active khi nhay trang */}
                                        <a className="nav-link" href="/register">Register <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login </a>
                                    </li>
                                    <li>
                                        {/* them duong link them newpost */}
                                        <a className="nav-link" href="/new-post">New post</a>
                                    </li>
                                </ul>
                            )}
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0 mr-sm-2" type="submit">Search</button>
                        </form>
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit"
                            onClick={() => {
                                this.state.currentUser ? (
                                    window.location.href = "/create-post"
                                ) : (
                                        window.location.href = "/login"
                                    )
                            }}
                        >+ New post</button>
                    </div>
                </nav>
            </div>
        )
    }
}
