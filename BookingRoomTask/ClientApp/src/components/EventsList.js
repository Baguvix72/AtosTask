import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './EventsList.css';

export class EventsList extends Component {

    constructor() {
        super();

        this.state = { eventsList: [], loading: true };

        fetch('api/Event')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventsList: data, loading: false });
            });
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

    renderEventTable = (eventList) => {
        let projectorIcon = <Glyphicon glyph='facetime-video' />
        let boardIcon = <Glyphicon glyph='pencil' />

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Комната</th>
                        <th>Количество мест</th>
                        <th>Забронированное время</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map(eventItem =>
                        <tr key={eventItem.id}>
                            <td>
                                <p className="iconsInTable">{eventItem.name}</p>
                                <p className="iconsInTable">{eventItem.haveProjector ? projectorIcon : ''}</p>
                                <p className="iconsInTable">{eventItem.haveBoard ? boardIcon : ''}</p>
                            </td>
                            <td>{eventItem.numSeat}</td>
                            <td>{this.getTimeEvent(eventItem.tevent)}</td>
                            <td>
                                <a className="action" onClick={() => this.handleUpdate(eventItem.id)}>Добавить</a>{'\t'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleUpdate = (id) => {
        this.props.history.push('/event_add/' + id);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderEventTable(this.state.eventsList);

        return (
            <div>
                <h1>План событий</h1>
                <p>Отображает список комнат с самым раннем на текущий день событием.</p>
                {contents}
            </div>
        );
    }
}
