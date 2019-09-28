
import React, { Component } from 'react'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errMessage: "",
            // isSuccess: true
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
            <div className='row'>
                <div className="col-4"></div>
                <div className="col-4">
                    <h2>Login</h2>
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
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                )}
                        </div>

                        <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title=""
                            style={{
                                margin: '20% 45%'
                            }}
                            onClick={() => { window.location.href = 'http://localhost:5000/user/auth/google' }}
                        >
                            Login With Google
                </button>
                    </form>
                </div>
                <div className="col-4"></div>
            </div>
        )
    }
}














