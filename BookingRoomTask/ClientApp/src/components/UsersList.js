import React, { Component } from 'react';

export class UsersList extends Component {

    constructor() {
        super();

        this.state = { usersList: [], loading: true };

        fetch('api/User')
            .then(response => response.json())
            .then(data => {
                this.setState({ usersList: data, loading: false });
            });
    }  

    renderUserTable = (userList) => {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(userItem =>
                        <tr key={userItem.id}>
                            <td>{userItem.login}</td>
                            <td>{userItem.idRoleNavigation.name}</td>
                            <td>
                                <a className="action" onClick={() => this.handleUpdate(userItem.id)}>Изменить</a>{"\t"}
                                <a className="action" onClick={() => this.handleDelete(userItem.id)}>Удалить</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleUpdate = (id) => {
        this.props.history.push('/user_edit/' + id);
    }

    handleDelete = (id) => {
        if (!window.confirm('Вы действительно хотите удалить этого пользователя?'))
            return;
        else {
            fetch('api/User/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        usersList: this.state.usersList.filter((rec) => {
                            return (rec.id !== id);
                        })
                    });
            });
        }  
    }

    handleAdd = () => {
        this.props.history.push('/user_add');
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderUserTable(this.state.usersList);

        return (
            <div>
                <h1>Список пользователей</h1>
                <p>Отображает список всех зарегистрированных на данный момент пользователей.
                    <a className="action" onClick={this.handleAdd}> Добавить нового</a>
                </p>
                {contents}
            </div>
        );
    }
}
