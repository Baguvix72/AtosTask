import React, { Component } from 'react';

export class RoomItem extends Component {

    handleSave = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data = this.normalizeCheckboxValue(data);

        fetch('api/Room', {
            method: 'POST',
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push('/list_rooms');
            })
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
                <form onSubmit={this.handleSave} method="post">
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Название комнаты</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" required />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Количество мест</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="numSeat" required />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Есть проектор</label>
                    <div className="col-md-4">
                        <input className="form-control" type="checkbox" name="haveProjector" />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12">Есть маркерная доска</label>
                    <div className="col-md-4">
                        <input className="form-control" type="checkbox" name="haveBoard" />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                </div >
                </form >  
                <button className="btn" onClick={this.handleCancel}>Отмена</button>
            </div>
        );
    }

    render() {
        let contents = this.renderCreateForm();

        return (
            <div>
                <h1>Добавить комнату</h1>
                <p>Введите описание комнаты.</p>
                {contents}
            </div>
        );
    }
}