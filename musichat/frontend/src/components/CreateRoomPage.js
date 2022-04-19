import React, { Component } from "react";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup, Collapse } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

export default class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallBack: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            successMsg: "",
            errorMsg: "",
        };

        this.handleButtonCreate = this.handleButtonCreate.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleCanPause = this.handleCanPause.bind(this);
        this.handleButtonUpdate = this.handleButtonUpdate.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        })
    }

    handleCanPause(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        })
    }

    handleButtonCreate() {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch("/api/novasala", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/sala/" + data.code));
    }

    handleButtonUpdate() {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode,
            }),
        };
        fetch("/api/atualizar-sala", requestOptions).then((response) => {
            if(response.ok){
                this.setState({
                    successMsg: "Sala modificada com sucesso!",
                });
            } else {
                this.setState({
                    errorMsg: "Erro ao modificar a sala, verifique os parâmetros!",
                });
            }
            this.props.updateCallBack();
        });
    }

    renderCreateButtons() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleButtonCreate}>
                         Criar uma sala 
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                         Voltar
                    </Button> 
                </Grid>
            </Grid>
        );
    }

    renderUpdateButtons() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleButtonUpdate}>
                         Salvar modificações
                    </Button>
                </Grid>
            </Grid>
        );
    }

    render() {
        const title = this.props.update ? "Modificar Sala" : "Criar uma sala"
       
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                        {this.state.successMsg != "" ? (
                            <Alert severity="success" onClose={() => {this.setState({successMsg: ""});}}>
                                {this.state.successMsg}
                            </Alert>
                            ) : (
                            <Alert severity="error" onClose={() => {this.setState({errorMsg: ""});}}>
                                {this.state.errorMsg}
                            </Alert>
                        )}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <div align="center">
                        <FormHelperText>
                            Permissão para o convidado controlar a playlist
                        </FormHelperText>
                        </div>
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleCanPause}>
                            <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary"/>}
                            label="Tocar/Pausar"
                            labelPlacement="bottom"
                            />
                            <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary"/>}
                            label="Sem controle"
                            labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                        required={true} 
                        type="number" 
                        onChange={this.handleVotesChange}
                        defaultValue={this.state.votesToSkip}
                        inputProps={{
                            min: 1,
                            style: {textAlign: "center"},
                        }}
                        />
                        <div align="center">
                        <FormHelperText>
                            Votos necessários para pular a música
                        </FormHelperText>
                        </div>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}      
            </Grid>
        );
    }
}