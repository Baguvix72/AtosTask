import React, { Component } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

export class ChecksList extends Component {

    constructor() {
        super();

        this.state = { eventsList: [], loading: true };

        this.updatePage();
    }

    updatePage = () => {

        fetch('api/Event/notcheck')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventsList: data, loading: false });
            });
        setTimeout(this.updatePage, 10000);
    }

    getTimeEvent = (tEvent) => {
        let startTime = new Date(tEvent.startTime);
        let finishTime = new Date(tEvent.finishTime)
        let dateTime = <DateTimeRangePicker value={[startTime, finishTime]}
            disabled={true} clearIcon={null}
            calendarIcon={null} />
        return dateTime;
    }

    renderEventTable = (eventList) => {

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Событие</th>
                        <th>Комната</th>
                        <th>Инициатор</th>
                        <th>Забронированное время</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map(eventItem =>
                        <tr key={eventItem.id}>
                            <td>{eventItem.name}</td>
                            <td>{eventItem.idRoomNavigation.name}</td>
                            <td>{eventItem.idUserNavigation.login}</td>
                            <td>{this.getTimeEvent(eventItem)}</td>
                            <td>
                                <button className="btn btn-default"
                                        onClick={() => this.handleResolve(eventItem.id, eventItem.idUser, true)}>Принять
                                </button>
                                <button className="btn btn-default"
                                        onClick={() => this.handleResolve(eventItem.id, eventItem.idUser, false)}>Отклонить
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleResolve = (idEvent, idUser, resolve) => {

        var data = new FormData();
        data.append('idEvent', idEvent);
        data.append('idUser', idUser);
        data.append('status', resolve);

        fetch('api/Check', {
            method: 'POST',
            body: data,
        }).then(data => {
            this.setState(
                {
                    eventsList: this.state.eventsList.filter((rec) => {
                        return (rec.id !== idEvent);
                    })
                });
        });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderEventTable(this.state.eventsList);

        return (
            <div>
                <h1>Не проверенные события</h1>
                <p>Отображает список событий, которые не подтвердил менеджер.</p>
                {contents}
            </div>
        );
    }
}
