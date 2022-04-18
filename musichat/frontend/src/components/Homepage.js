import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Routes, Switch, Route, Link, Redirect } from "react-router-dom";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Routes>
            <Switch>
                <Route exact path='/'><p>This is the home page!</p></Route>
                <Route path='/entrar' component={RoomJoinPage}/>
                <Route path='/novasala' component={CreateRoomPage}/>
                <Route path='/sala/:roomCode' component={Room}/>
            </Switch>
        </Routes>
        );
    }
}