import React, { Component } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

export class EventAdd extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params['id'];
        this.state = { roomId: id, userList: [], loading: true, date: [new Date(), new Date()] };

        fetch('api/User')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });
    }

    handleSave = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data.append('startTime', this.state.date[0].toISOString());
        data.append('finishTime', this.state.date[1].toISOString());

        fetch('api/Event/add', {
            method: 'POST',
            body: data,
        }).then(this.props.history.push('/events_list'))
    }

    handleCancel = () => {
        this.props.history.push('/events_list');
    }

    handleChangeDate = (date) => {
        this.setState({ date });
    }

    renderAddForm = () => {

        return (
            <div>
                <form onSubmit={this.handleSave}>
                    <div className="form-group row" >
                        <input type="hidden" name="idRoom" value={this.state.roomId} />
                    </div>
                    <div className="form-group row" >
                        <label className=" control-label col-md-12">Название</label>
                        <div className="col-md-4">
                            <input className="form-control" type="text" name="name" required />
                        </div>
                    </div >
                    <div className="form-group row">
                        <label className=" control-label col-md-12">Описание</label>
                        <div className="col-md-4">
                            <textarea className="form-control" name="description"></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className=" control-label col-md-12">Время проведения</label>
                        <div className="col-md-4">
                            <DateTimeRangePicker onChange={this.handleChangeDate}
                                value={this.state.date}
                                clearIcon={null}
                                disableClock={true}
                                minDate={new Date()}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="control-label col-md-12">Пользователь</label>
                        <div className="col-md-4">
                            <select className="form-control" data-val="true" name="idUser" defaultValue={1} required>
                                <option value="">-- Выберите пользователя --</option>
                                {this.state.userList.map(user =>
                                    <option key={user.id} value={user.id}>{user.login}</option>
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
            : this.renderAddForm();

        return (
            <div>
                <h1>Добавление нового события</h1>
                <p>Введите описание события.</p>
                {contents}
            </div>
        );
    }
}