import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { BrowserRouter as Routes, Switch, Route, Link, Redirect } from "react-router-dom";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/usario-em-sala')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Musichat 🎵🎩
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/entrar" component={Link}>
                            Entrar na sala
                        </Button>
                        <Button color="secondary" to="/novasala" component={Link}>
                            Criar uma sala
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    render() {
        return (
        <Routes>
            <Route 
                exact 
                path='/' 
                render={() => {
                    return this.state.roomCode ? (
                    <Redirect to={`/sala/${this.state.roomCode}`}/>
                    ) : (
                        this.renderHomePage()
                    ); 
            }}/>
            <Route path='/entrar' component={RoomJoinPage}/>
            <Route path='/novasala' component={CreateRoomPage}/>
            <Route path='/sala/:roomCode' 
            render={(props) => {
                return <Room {...props} leaveRoomCallBack={this.clearRoomCode} />;
            }}
            />
        </Routes>
        );
    }
}