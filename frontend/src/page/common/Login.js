import React, { Component } from 'react';
import axios from 'axios';


const URL='http://localhost:8080/users/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid:'',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${URL}`,  {
            userEmail: this.state.userid,
            password: this.state.password,
        })
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.success);
                    this.setState({
                        redirect: true
                    });
                }
                console.log(res)
                
            })
            .catch(error => {
                this.setState({
                    error:true,
                    isSubmitted: false
                })
                console.log(error)
            })

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                <form onSubmit={this.handleSubmit}>
            <div className="label_login_chk">
                <input
                    name="loginchk"
                    type="checkbox"
                    id="login_chk"
                />
                <label htmlFor="login_chk" id="label_login_chk" >자동 로그인</label></div>
                <br></br>
                <input
                    name="userid"
                    type="text"
                    placeholder="User ID"
                    className="form-control front-input"
                    onChange={this.handleChange}
                    value={this.state.userid}
                />
                <br/>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control last-input"
                    onChange={this.handleChange}
                    value={this.state.password}
                />
                <button type="submit" >로그인</button>
                
            </form>
                </div>
            </div>
        );
    }
}

export default Login;