import React, { useState } from 'react';
import requestService from '../services/requestService';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { Link } from "react-router-dom";
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';

function Simulation() {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [time, setTime] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [titleClientForm] = useState("Simulación de crédito");

  const doSimulation = (e) => {
    e.preventDefault();

    const request = {rut :"10.000.000-0", type, amount, interest, time, state: 0, id: 0}

    requestService
    .simulation(request)
    .then((response) => {
        console.log("La simulación del crédito ha sido realizada correctamente.", response.data);
        setMonthlyPayment(response.data);
    })
    .catch((error) => {
        console.log("Ha ocurrido un error al intentar simular el crédito.", error);
    });
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    component="form"
    sx={{ backgroundColor: 'white', padding: 20, borderRadius: 2, boxShadow: 5, gap: 4,}}
    >
      <Typography variant="h5" style={{ color: 'orange' }}>
            {titleClientForm}
      </Typography>
      <hr />

      <FormControl fullWidth>
          <TextField
            id="type"
            label="Type of request"
            value={type}
            variant="standard"
            onChange={(e) => setType(e.target.value)}
            helperText="Tipo de préstamo. Ej: Primera Vivienda"
          />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="amount"
          label="Amount of the request"
          type="number"
          value={amount}
          variant="standard"
          onChange={(e) => setAmount(e.target.value)}
          helperText="Monto del préstamo en Pesos Chilenos. Ej: 5000000"
          sx={{
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                display: 'none', },

            '& input[type=number]': {MozAppearance: 'textfield',},
          }}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
            id="interest"
            label="Interest of the request"
            type="number"
            value={interest}
            variant="standard"
            onChange={(e) => setInterest(e.target.value)}
            helperText="Ingresa el interés anual del préstamo en valor decimal. Ej: 3.5"
            sx={{
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                display: 'none',
            },
            '& input[type=number]': {
                MozAppearance: 'textfield',
            },
            }}
        />
        </FormControl>

      <FormControl fullWidth>
          <TextField
            id="time"
            label="Time to pay back the loan"
            type="number"
            value={time}
            variant="standard"
            onChange={(e) => setTime(e.target.value)}
            helperText="Plazo para devolver el préstamo en años. Ej: 10 (10 años)"
            sx={{
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  display: 'none', },

              '& input[type=number]': {MozAppearance: 'textfield',},
            }}
          />
      </FormControl>

    <FormControl>
        <br />
        <Button
          variant="contained"
          color="info"
          type="submit"
          onClick={(e) => doSimulation(e)}
          startIcon={<LinearScaleIcon />}
        >
          Simular 
        </Button>
    </FormControl>

      {monthlyPayment !== null && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" style={{ color: 'green' }}>
            Cuota mensual estimada: ${monthlyPayment}
          </Typography>
        </Box>
      )}

    <Box sx={{ marginTop: 3 }}>
        <Button component={Link} to="/home" variant="outlined" color="primary">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}
export default Simulation;