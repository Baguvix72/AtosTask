import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { RoomsList } from './components/RoomsList';
import { RoomItem } from './components/RoomItem';
import { UsersList } from './components/UsersList';
import { UserItem } from './components/UserItem';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={RoomsList} />
        <Route path='/room_add' component={RoomItem} />
        <Route path='/room_edit/:id' component={RoomItem} />
        <Route path='/list_users' component={UsersList} />
        <Route path='/user_add' component={UserItem} />
        <Route path='/user_edit/:id' component={UserItem} />
      </Layout>
    );
  }
}
