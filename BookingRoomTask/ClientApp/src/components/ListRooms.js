import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export class ListRooms extends Component {

    constructor() {
        super();

        this.state = { roomsList: [], loading: true };

        fetch('api/Room')
            .then(response => response.json())
            .then(data => {
                this.setState({ roomsList: data, loading: false });
            });
    }  

    renderRoomsTable = (roomsList) => {
        let projectorIcon = <Glyphicon glyph='glyphicon glyphicon-facetime-video' />
        let boardIcon = <Glyphicon glyph='glyphicon glyphicon-pencil' />

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Комната</th>
                        <th>Количество мест</th>
                        <th>Наличие проектора</th>
                        <th>Наличие маркерной доски</th>
                    </tr>
                </thead>
                <tbody>
                    {roomsList.map(roomItem =>
                        <tr key={roomItem.id}>
                            <td>{roomItem.name}</td>
                            <td>{roomItem.numSeat}</td>
                            <td>{roomItem.haveProjector ? projectorIcon : ''}</td>
                            <td>{roomItem.haveBoard ? boardIcon : ''}</td>
                            <td>
                                <a className="action" onClick={() => this.handleUpdate(roomItem.id)}>Изменить</a>{"\t"}
                                <a className="action" onClick={() => this.handleDelete(roomItem.id)}>Удалить</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleUpdate = (id) => {
        this.props.history.push('/room_item/' + id);
    }

    handleDelete = (id) => {
        if (!window.confirm('Вы действительно хотите удалить эту комнату?'))
            return;
        else {
            fetch('api/Room/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        roomsList: this.state.roomsList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }  
    }

    handleAdd = () => {
        this.props.history.push('/room_item');
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderRoomsTable(this.state.roomsList);

        return (
            <div>
                <h1>Список комнат</h1>
                <p>Отображает список всех имеющихся на данный момент переговорных.
                    <a className="action" onClick={this.handleAdd}> Добавить новую</a>
                </p>
                {contents}
            </div>
        );
    }
}
