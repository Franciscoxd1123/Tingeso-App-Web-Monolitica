import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import requestService from "../services/requestService";
import { Box, FormControl, TextField, Button } from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import Typography from "@mui/material/Typography";

const CreateRequest = () => {
    const [rut, setRut] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [state, setState] = useState("");
    const { id } = useParams();
    const [titleClientForm] = useState("Nueva Solicitud");
    const navigate = useNavigate();

    const saveRequest = (e) => {
        e.preventDefault();

        const request = {rut, type, amount, interest, time, state, id};
        
          requestService
          .create(request)
          .then((response) => {
              console.log("La Solicitud ha sido registrada con éxito.", response.data);
              navigate("/home");
          })
          .catch((error) => {
              console.log("Ha ocurrido un error al intentar registrar la nueva solicitud.", error);
          });
    }

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
                id="rut"
                label="Rut"
                value={rut}
                variant="standard"
                onChange={(e) => setRut(e.target.value)}
                helperText="Ej: 12.587.698-8"
              />
          </FormControl>

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

          <FormControl fullWidth>
              <TextField
                id="state"
                label="State of the request"
                type="number"
                value={state}
                variant="standard"
                onChange={(e) => setState(e.target.value)}
                helperText="Al ser una nueva solicitud, ingresar el valor 1 (Estado 1)"
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
                onClick={(e) => saveRequest(e)}
                startIcon={<NearMeIcon />}
              >
                Solicitar
              </Button>
          </FormControl>
          <Box sx={{ marginTop: 3 }}>
            <Button component={Link} to="/home" variant="outlined" color="primary">
                Back to Home
            </Button>
          </Box>
        </Box>
    );
};
export default CreateRequest;