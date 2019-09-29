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
            isSuccess: false,
            counter: 3,
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
                errMessage: 'Confirm password didnt match'
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
                    this.setState({
                        isSuccess: true
                    });
                    setTimeout(() => {
                        this.setState({
                            counter: 2,
                        });
                    }, 1000);
                    setTimeout(() => {
                        this.setState({
                            counter: 1,
                        });
                    }, 2000);
                    setTimeout(() => {
                        this.setState({
                            counter: 0,
                        });
                        window.location.href = '/login';
                    }, 3000);
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
            <div className="row">
                <div class="col-4"></div>
                <div class="col-4">
                    <h2>Register Account </h2>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter email"
                                ref={input => { this.email = input }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter password"
                                ref={input => { this.pass = input }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword2">Confirm password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword2"
                                placeholder="Confirm password"
                                ref={input => { this.pass2 = input }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputFullname">Full name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputFullname"
                                placeholder="Enter fullname"
                                ref={input => { this.name = input }}
                                required
                            />
                        </div>

                        {this.state.errMessage ? (
                            <div class="alert alert-danger" role="alert">
                                {this.state.errMessage}
                            </div>
                        ) : null}

                        {this.state.isSuccess ? (
                            <div class="alert alert-success" role="alert">
                                Login success! Redirect in {this.state.counter}s
                            </div>
                        ) : null}

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {this.state.loading ? (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                )}
                        </div>
                    </form>
                </div>
                <div class="col-4"></div>
            </div>
        )
    }
}
