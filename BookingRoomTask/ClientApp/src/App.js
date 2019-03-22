import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { RoomsList } from './components/RoomsList';
import { RoomItem } from './components/RoomItem';
import { UsersList } from './components/UsersList';
import { UserItem } from './components/UserItem';
import { EventsList } from './components/EventsList';
import { EventItem } from './components/EventItem';
import { EventAdd } from './components/EventAdd';
import { ChecksList } from './components/ChecksList';

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
        <Route path='/events_list' component={EventsList} />
        <Route path='/event_item/:id' component={EventItem} />
        <Route path='/event_add/:id' component={EventAdd} />
        <Route path='/checks_list' component={ChecksList} />
      </Layout>
    );
  }
}
