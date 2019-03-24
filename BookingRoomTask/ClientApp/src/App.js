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
import { Login } from './components/Login';

export default class App extends Component {
  displayName = App.name

    constructor() {
      super();

        let result = localStorage.getItem('hash');
        this.state = { isLogin: false, role: null };

        if (result == null) {
            this.setState({ isLogin: false });
        } else {
            let data = new FormData();
            data.append('hash', result);

            fetch('api/User/Hash', {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(res => {
                    if (res.user > 0) {
                        this.setState({ isLogin: true, role: res.role });
                    } else {
                        this.setState({ isLogin: false });
                    }
                });
        }
    }

    renderRouteManager = () => {
        return (
        <Layout role={this.state.role} logout={this.handleLoout}>
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
        )
    }

    renderRouteUser = () => {
        return (
            <Layout role={this.state.role} logout={this.handleLoout}>
                <Route exact path='/' component={EventsList} />
                <Route path='/events_list' component={EventsList} />
                <Route path='/event_item/:id' component={EventItem} />
                <Route path='/event_add/:id' component={EventAdd} />
            </Layout>
        )
    }

    handleLogin = (event) => {

        event.preventDefault();
        let data = new FormData(event.target);

        fetch('api/User/Check', {
            method: 'POST',
            body: data,
        }).then(response => response.json())
            .then(data => {
                if (data.hash != null) {
                    localStorage.setItem('hash', data.hash);
                    this.setState({ isLogin: true, role: data.role });
                }
            });
    }

    handleLoout = () => {
        localStorage.setItem('hash', '');
        this.setState({ isLogin: false });
    }

    renderRoute = () => {
        if (this.state.role === 2) {
            return this.renderRouteManager();
        } else {
            return this.renderRouteUser();
        }
    }

    renderLogin = () => {
        return (
            <div>
                <Route exact path='/'
                    render={() => (<Login handleLogin={this.handleLogin} />)}
                />
            </div>
           )
    }

    render() {
        let content = this.state.isLogin ? this.renderRoute() : this.renderLogin();

        return (
            <div>
                {content}
            </div>
    );
  }
}
