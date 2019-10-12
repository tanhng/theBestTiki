import React, { Component } from 'react'

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // email: "",
            // password: "",
            // confirmPassword: "",
            // fullName: "",
            errMessage: "",
            loading: false,
        }
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();

        //validate
        if (!emailRegex.test(this.email.value)) {
            this.setState({
                errMessage: "Invalid Email"
            });
        } else if (this.pass.value.length < 8) {
            this.setState({
                errMessage: 'Password must be more than 6 characters'
            });
        } else if (this.pass.value !== this.pass2.value) {
            this.setState({
                errMessage: 'Confirm password not matching'
            });
        } else {
            this.setState({
                errMessage: "",
                loading: true,
            });

            try {
                const data = await fetch("http://localhost:5000/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: this.email.value,
                        password: this.pass.value,
                        fullName: this.name.value
                    })
                }).then((res) => { return res.json(); });

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
    }

    render() {
        return (
            <div>
                <div className="card mx-auto mt-5 w-25">
                    <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <p className="text-center">Get started with your free account</p>
                        <p>
                            <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i> &nbsp; Login via Twitter</a>
                            <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i> &nbsp; Login via facebook</a>
                        </p>
                        <p className="divider-text">
                            <span>OR</span>
                        </p>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Full name" type="text"
                                    ref={input => { this.name = input }}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Email address" type="email"
                                    ref={input => { this.email = input }}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                                </div>
                                <select className="custom-select" style={{ maxWidth: "120px" }}>
                                    <option selected="">+84</option>
                                    <option value="1">+198</option>
                                </select>
                                <input name="" className="form-control" placeholder="Phone number" type="text" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                                </div>
                                <select className="form-control">
                                    <option selected=""> Select job type</option>
                                    <option>Designer</option>
                                    <option>Manager</option>
                                    <option>Accaunting</option>
                                </select>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="Create password" type="password"
                                    ref={input => { this.pass = input }}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="Repeat password" type="password"
                                    ref={input => { this.pass2 = input }}
                                    required
                                />
                            </div>
                            {this.state.errMessage ? (
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errMessage}
                                </div>
                            ) : null}
                            {this.state.loading ? (
                                <div className="spinner-border" role="status"
                                    style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                                    </div>
                                )
                            }

                            <p className="text-center">Have an account? <a href="/login">Sign In</a> </p>
                        </form>
                    </article>
                </div>
            </div >
        )
    }
}
