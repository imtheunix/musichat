import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
    defaultVotes = 2; 

    constructor(props) {
        super(props);
        this.state = {
            guest_can_pause: true,
            votesToSkip: this.defaultVotes,
        };

        this.handleButtonCreate = this.handleButtonCreate.bind(this)
        this.handleVotesChange = this.handleVotesChange.bind(this)
        this.handleCanPause = this.handleCanPause.bind(this)
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        })
    }

    handleCanPause(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false,
        })
    }

    handleButtonCreate() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            }),
        }
        fetch('/api/novasala', requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/sala/" + data.code));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Criar uma sala
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <div align="center">
                        <FormHelperText>
                            Permissão para o convidado controlar a playlist
                        </FormHelperText>
                        </div>
                        <RadioGroup row defaultValue='true' onChange={this.handleCanPause}>
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
                        defaultValue={this.defaultVotes}
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
}