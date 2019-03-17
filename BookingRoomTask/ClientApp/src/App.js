import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ListRooms } from './components/ListRooms';
import { RoomItem } from './components/RoomItem';
import { UsersList } from './components/UsersList';
import { UserItem } from './components/UserItem';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/list_rooms' component={ListRooms} />
        <Route path='/room_add' component={RoomItem} />
        <Route path='/room_edit/:id' component={RoomItem} />
        <Route path='/list_users' component={UsersList} />
        <Route path='/user_add' component={UserItem} />
      </Layout>
    );
  }
}
