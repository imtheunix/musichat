import React, { Component } from "react";
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: true,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {}
        };
        this.roomCode = this.props.match.params.roomCode;
        this.handlerLeaveButton = this.handlerLeaveButton.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
        this.getCurrentSong();
    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000);
      }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRoomDetails() {
        return fetch('/api/puxarsala?code=' + this.roomCode)
            .then((response) => {
                if(!response.ok) {
                    this.props.leaveRoomCallBack();
                    this.props.history.push("/");
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                if(this.state.isHost){
                    this.authenticateSpotify()
                }
            });
    }

    authenticateSpotify() {
        const requestOptions = {

        }
        fetch('/spotify/is-auth')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                spotifyAuthenticated: data.status,
            });
            if(!data.status) {
                fetch('/spotify/get-auth-url')
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url);
                });
            }
        });
    }

    getCurrentSong() {
        fetch("/spotify/current-song")
          .then((response) => {
            if (!response.ok) {
              return {};
            } else {
              return response.json();
            }
          })
          .then((data) => {
            this.setState({ song: data });
            console.log(data);
          });
      }

    handlerLeaveButton() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        fetch('/api/sair-da-sala', requestOptions).then((_reponse) => {
            this.props.leaveRoomCallBack();
            this.props.history.push('/');
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={this.state.votesToSkip} 
                        guestCanPause={this.state.guestCanPause} 
                        roomCode={this.roomCode}
                        updateCallBack={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)}>
                        Fechar
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
                    Configura????es
                </Button>
            </Grid>
        );
    }

    render() {
        if(this.state.showSettings) {
            return this.renderSettings();
        }
        return( 
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Sala: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <MusicPlayer {...this.state.song}/>
                </Grid>
                <Grid item xs={12} align="center">
                    {this.state.isHost ?
                        <Typography variant="h6" component="h6">
                            Voc?? ?? o dono da sala.
                        </Typography>
                    : null}
                </Grid>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.handlerLeaveButton}>
                        Sair da sala
                    </Button>
                </Grid>
            </Grid>
        );
    }
}