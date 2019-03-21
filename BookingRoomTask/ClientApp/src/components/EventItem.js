import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import DatePicker from 'react-date-picker';
import './EventsList.css';

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

    handleAdd = (id) => {
        this.props.history.push('/event_add/' + id);
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

    handleChangeDate = (date) => {

        var data = new FormData();
        data.append('idRoom', this.state.idRoom);
        data.append('dateEvents', date.toISOString());

        fetch('api/Event', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ room: data, loading: false, dateTime: date });
            });
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
                <div>
                    <p className="iconsInTable">Занятое время на указанную дату: </p>
                    <DatePicker
                        onChange={this.handleChangeDate}
                        value={this.state.dateTime}
                        clearIcon={null}
                    />
                </div>
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
                <button type="button" className="btn btn-default" onClick={() => this.handleAdd(this.state.room.id)}>Забронровать</button>
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