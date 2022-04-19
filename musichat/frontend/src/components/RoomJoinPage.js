import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonCreate = this.handleButtonCreate.bind(this);
    }

    handleTextChange(e){
        this.setState({
            roomCode: e.target.value,
        });
    }

    handleButtonCreate() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode,
            }),
        };
        fetch('/api/entrar-sala', requestOptions)
            .then((response) => {
                if(response.ok) {
                    console.log(response);
                    this.props.history.push(`/sala/${this.state.roomCode}`)
                } else {
                    this.setState({ error: 'Sala não encontrada.' })
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Entrar em uma sala
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField 
                        error={this.state.error}
                        label="Código"
                        placeholder="Insira o código da sala"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.handleButtonCreate}>
                        Entrar na sala
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Voltar
                    </Button>
                </Grid>
            </Grid>
        );
    }
}