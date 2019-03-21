import React, { Component } from 'react';

export class UserItem extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', loading: true, roleList: [], userData: {}, isEdit: false };

        let id = this.props.match.params['id'];

        fetch('api/User/role')
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data });
            });

        if (id > 0) {
            fetch('api/User/' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: 'Изменить пользователя', loading: false, userData: data, isEdit: true });
                });
        }
        else {
            this.state = { title: 'Добавить пользователя', loading: false, roleList: [], userData: {}, isEdit: false };
        }  
    }

    handleSave = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data = this.normalizeRoleValue(data);

        if (this.state.isEdit) {
            fetch('api/User', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/list_users");
                })  
        }
        else {
            fetch('api/User', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push('/list_users');
                })
        }
    }

    normalizeRoleValue = (data) => {
        switch (data.get('idRole')) {
            case 'Сотрудник':
                data.set('idRole', 1);
                break;
            case 'Менеджер':
                data.set('idRole', 2);
                break;
            default:
                data.set('idRole', 1);
        }
        return data;
    }

    handleCancel = () => {
        this.props.history.push('/list_users');
    }

    renderCreateNewForm = () => {
        let defaultRole = this.state.isEdit ? this.state.userData.idRoleNavigation.name : '';

        return (
            <div>
                <form onSubmit={this.handleSave}>
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.userData.id} />
                </div>  
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Логин</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="login" defaultValue={this.state.userData.login} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className=" control-label col-md-12">Пароль</label>
                    <div className="col-md-4">
                            <input className="form-control" type="password" name="hash" defaultValue={this.state.userData.hash} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12">Роль</label>
                        <div className="col-md-4">
                            <select className="form-control" data-val="true" name="idRole" defaultValue={defaultRole} required>
                            <option value="">-- Выберите роль пользователя --</option>
                            {this.state.roleList.map(role =>
                                <option key={role.id} value={role.name}>{role.name}</option>
                            )}
                        </select>
                    </div>
                </div >  
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                    <button className="btn" onClick={this.handleCancel}>Отмена</button>
                </div>
                </form>  
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderCreateNewForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Введите описание пользователя.</p>
                {contents}
            </div>
        );
    }
}