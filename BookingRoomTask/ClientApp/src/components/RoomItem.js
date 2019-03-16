import React, { Component } from 'react';

export class RoomItem extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', loading: true, roomData: {}, isEdit: false };

        let id = this.props.match.params['id'];

        if (id > 0) {
            fetch('api/Room/' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: 'Изменить комнату', loading: false, roomData: data, isEdit: true });
                });
        }
        else {
            this.state = { title: 'Добавить комнату', loading: false, roomData: {}, isEdit: false };
        }  
    }

    handleSave = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data = this.normalizeCheckboxValue(data);

        if (this.state.isEdit) {
            fetch('api/Room', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/list_rooms");
                })  
        }
        else {
            fetch('api/Room', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push('/list_rooms');
                })
        }
    }

    /* Html checkbox передает в javascript значения
     * null и on, когда галочка стоит и не стоит соответственно.
     * Эта функция меняет данные с формы на логические значения
     * */
    normalizeCheckboxValue = (data) => {
        if (data.get('haveBoard') == null)
        {
            data.set('haveBoard', false);
        }
        else
        {
            data.set('haveBoard', true);
        }

        if (data.get('haveProjector') == null)
        {
            data.set('haveProjector', false);
        }
        else
        {
            data.set('haveProjector', true);
        }
        return data;
    }

    handleCancel = () => {
        this.props.history.push('/list_rooms');
    }

    renderCreateForm = () => {
        return (
            <div>
                <form onSubmit={this.handleSave}>
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.roomData.id} />
                </div>  
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Название комнаты</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.roomData.name} required />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Количество мест</label>
                    <div className="col-md-4">
                            <input className="form-control" type="text" name="numSeat" defaultValue={this.state.roomData.numSeat} required />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Есть проектор</label>
                        <div className="col-md-4">
                            <input className="form-control" type="checkbox" name="haveProjector" defaultChecked={this.state.roomData.haveProjector} />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Есть маркерная доска</label>
                        <div className="col-md-4">
                            <input className="form-control" type="checkbox" name="haveBoard" defaultChecked={this.state.roomData.haveBoard} />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                    <button className="btn" onClick={this.handleCancel}>Отмена</button>
                </div >
                </form >  
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Введите описание комнаты.</p>
                {contents}
            </div>
        );
    }
}