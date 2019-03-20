import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

export class EventItem extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params['id'];

        let now = new Date();
        this.state = { loading: true, room: {}, dateTime: now, idRoom: id };

        var data = new FormData();
        data.append('idRoom', id);
        data.append('dateEvents', now.toISOString());

        fetch('api/Event', {
            method: 'POST',
            body: data,
        })
          .then(response => response.json())
              .then(data => {
                  this.setState({ room: data, loading: false });
              });
    }

    handleSave = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data = this.normalizeRoleValue(data);

        fetch('api/User', {
            method: 'POST',
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push('/list_users');
            })
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

    getTimeEvent = (tEvent) => {
        let dateTime = 'Аудитория свободна';
        if (tEvent != null) {
            let startTime = new Date(tEvent.startTime);
            let finishTime = new Date(tEvent.finishTime)
            dateTime = <DateTimeRangePicker value={[startTime, finishTime]}
                disabled={true} clearIcon={null}
                calendarIcon={null} />
        }
        return dateTime;
    }

    renderCreateNewForm = () => {
        let trueIcon = <Glyphicon glyph='ok' />
        let falseIcon = <Glyphicon glyph='remove' />

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">Комната: {this.state.room.name}</li>
                    <li className="list-group-item">Количество мест: {this.state.room.numSeat}</li>
                    <li className="list-group-item">
                        Проектор: {this.state.room.haveProjector ? trueIcon : falseIcon}
                    </li>
                    <li className="list-group-item">
                        Доска: {this.state.room.haveBoard ? trueIcon : falseIcon}
                    </li>
                    <li className="list-group-item">Описание: {this.state.room.description}</li>
                </ul>
                <p>Забронированное время</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Событие</th>
                            <th>Описание</th>
                            <th>Время</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.room.tevent.map(eventItem =>
                            <tr key={eventItem.id}>
                                <td>{eventItem.name}</td>
                                <td>{eventItem.description}</td>
                                <td>{this.getTimeEvent(eventItem)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderCreateNewForm();

        return (
            <div>
                <h1>Забронировать комнату</h1>
                <p>Описание комнаты</p>
                {contents}
            </div>
        );
    }
}