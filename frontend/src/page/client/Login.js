import React, { Component } from 'react';
import axios, { post } from 'axios';

const URL = 'http://localhost:8080/auth/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            file: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${URL}`, {
            username: this.state.username,
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
                    error: true,
                    isSubmitted: false
                })
                console.log(error)
            })

    }
    fileUpload(file) {
        const url = 'http://54.180.99.61:8080/menu/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('storename', "teststore");
        formData.append('price', 1000);
        formData.append('menuname', "menu1");

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    upload = (e) => {
        e.preventDefault();
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    fileChange = (e) => {
        this.setState({ file: e.target.files[0] })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            < div >
                < div >
                    < form
                        onSubmit={this.handleSubmit} >
                        < div
                            className="label_login_chk" >
                            < input
                                name="loginchk"
                                type="checkbox"
                                id="login_chk"
                            />
                            < label
                                htmlFor="login_chk"
                                id="label_login_chk" > 자동 로그인 </label></div >
                        < br />
                        < input
                            name="username"
                            type="text"
                            placeholder="UserName"
                            className="form-control front-input"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        < br />
                        < input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="form-control last-input"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        < button type="submit">
                            로그인 </button>

                    </form>
                </div>

                <h1>파일 업로드</h1>
                <form onSubmit={this.upload}>
                    <h1>File Upload</h1>
                    <input type="file" onChange={this.fileChange} name="file" />
                    <button type="submit">Upload</button>
                </form>

            </div>
        )

    }
}

export default Login;