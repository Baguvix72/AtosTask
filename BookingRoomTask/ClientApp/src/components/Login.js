import React, { Component } from 'react';
import './Login.css';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = ({ result: {} });
    }

    renderLoginForm = () => {

        return (
            <div className="box">
                <form onSubmit={this.props.handleLogin}>
                    <div className="form-group row" >
                        <label className="control-label">Логин</label>
                        <div className="col">
                            <input className="form-control" type="text" name="login" required />
                        </div>
                    </div >
                    <div className="form-group row">
                        <label className="control-label">Пароль</label>
                        <div className="col">
                            <input className="form-control" type="password" name="hash" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Войти</button>
                    </div>
                </form>
                <p>{this.state.result.message}</p>
            </div>
        );
    }

    render() {
        let contents = this.renderLoginForm();

        return (
            <div className="main-container">
                {contents}
            </div>
        );
    }
}
