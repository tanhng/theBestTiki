
import React, { Component } from 'react'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errMessage: "",
            loading: false
        }
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

    render() {
        return (
            <div>
                <div className="card card mx-auto mt-5 w-25">
                    <article className="card-body">
                        <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
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
                                <input name="" className="form-control" placeholder="Email or login" type="email"
                                    ref={input => { this.email = input }}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="******" type="password"
                                    ref={input => { this.pass = input }}
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
                                        <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                                    </div>
                                )
                            }
                            <p className="text-center">Have account? <a href="/register">Sign up</a> </p>
                            <p className="text-center"><a href="#" className="btn">Forgot password?</a></p>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}














