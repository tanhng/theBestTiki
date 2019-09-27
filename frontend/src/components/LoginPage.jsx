import React, { Component } from 'react'

export default class LoginPage extends Component {
    state = {
        something: ""
    }

    render() {
        return (
            <div>
                <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title=""
                    style={{
                        margin: '20% 45%'
                    }}
                    onClick={() => { window.location.href = 'http://localhost:5000/user/auth/google' }}
                >
                    Login With Google
                </button>
            </div>
        )
    }
}
