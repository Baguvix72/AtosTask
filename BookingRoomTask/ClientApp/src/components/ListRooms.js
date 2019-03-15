import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export class ListRooms extends Component {
    displayName = ListRooms.name

    static renderRoomsTable() {
        let projectorIcon = <Glyphicon glyph='glyphicon glyphicon-facetime-video' />
        let boardIcon = <Glyphicon glyph='glyphicon glyphicon-pencil' />

        let roomsList = [
            {
                Id: 1,
                Name: "2222",
                NumSeat: 24,
                HaveProjector: true,
                HaveBoard: true,
            },
        ];

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
                        <tr key={roomItem.Id}>
                            <td>{roomItem.Name}</td>
                            <td>{roomItem.NumSeat}</td>
                            <td>{roomItem.HaveProjector ? projectorIcon : "Отсутствует"}</td>
                            <td>{roomItem.HaveBoard ? boardIcon : "Отсутствует"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = ListRooms.renderRoomsTable();

        return (
            <div>
                <h1>List rooms</h1>
                <p>This component show all rooms list.</p>
                {contents}
            </div>
        );
    }
}
