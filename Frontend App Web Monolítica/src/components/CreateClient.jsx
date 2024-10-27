import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../services/clientService";
import { Box, FormControl, TextField, Button, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";

const CreateClient = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [saved, setSaved] = useState("");
    const [csaved, setcsaved] = useState("");
    const [latePayment, setLatePayment] = useState("");
    const [debt, setDebt] = useState("");
    const [freelance, setFreelance] = useState("");
    const [seniority, setSeniority] = useState("");
    const [stable, setStable] = useState("");
    const [retreats, setRetreats] = useState("");
    const [recentRetreats, setRecentRetreats] = useState("");
    const [deposits, setDeposits] = useState("");
    const { id } = useParams();
    const [titleClientForm] = useState("Nuevo Cliente");
    const navigate = useNavigate();

    const saveClient = (e) => {
        e.preventDefault();

        const client = {name, lastName, rut, age, salary, saved, csaved, latePayment, debt, 
            freelance, seniority, stable, retreats, recentRetreats, deposits, id};
        
          clientService
          .create(client)
          .then((response) => {
              console.log("El Nuevo Cliente ha sido registrado con éxito.", response.data);
              navigate("/home");
          })
          .catch((error) => {
              console.log("Ha ocurrido un error al intentar registrar el nuevo cliente.", error);
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
                id="name"
                label="Name"
                value={name}
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                variant="standard"
                onChange={(e) => setLastName(e.target.value)}
              />
          </FormControl>

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
              id="age"
              label="Age"
              type="number"
              value={age}
              variant="standard"
              onChange={(e) => setAge(e.target.value)}
              helperText="La edad mínima es 18 años. Ej: 20"
              sx={{
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                    display: 'none', },

                '& input[type=number]': {MozAppearance: 'textfield',},
              }}
            />
          </FormControl>
    
          <FormControl fullWidth>
              <TextField
                id="salary"
                label="Salary"
                type="number"
                value={salary}
                variant="standard"
                onChange={(e) => setSalary(e.target.value)}
                helperText="Salario mensual en Pesos Chilenos. Ej: 500000"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="saved"
                label="Balance in savings account"
                type="number"
                value={saved}
                variant="standard"
                onChange={(e) => setSaved(e.target.value)}
                helperText="Saldo cuenta de ahorros en Pesos Chilenos. Ej: 1000000"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>
    
          <FormControl fullWidth>
              <TextField
                id="csaved"
                label="Seniority of savings account"
                type="number"
                value={csaved}
                variant="standard"
                onChange={(e) => setcsaved(e.target.value)}
                helperText="Antigüedad cuenta de ahorros en años. Ej: 3 (3 años desde que fue creada)"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="latePayment"
                label="Do you have any debts?"
                value={latePayment}
                select
                variant="standard"
                onChange={(e) => setLatePayment(e.target.value === 'true')}
              >
                <MenuItem value={"true"}>Yes</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </TextField>
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="debt"
                label="Total value of debts"
                type="number"
                value={debt}
                variant="standard"
                onChange={(e) => setDebt(e.target.value)}
                helperText="Suma de deudas en Pesos Chilenos. Ej: 200000"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="freelance"
                label="Are you freelance?"
                value={freelance}
                select
                variant="standard"
                onChange={(e) => setFreelance(e.target.value === 'true')}
              >
                <MenuItem value={"true"}>Yes</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </TextField>
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="seniority"
                label="Seniority in work"
                type="number"
                value={seniority}
                variant="standard"
                onChange={(e) => setSeniority(e.target.value)}
                helperText="Antiguedad en el trabajo en años. Ej: 5 (Lleva 5 años en el trabajo)"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>
    
          <FormControl fullWidth>
              <TextField
                id="stable"
                label="Are you stable?"
                value={stable}
                select
                variant="standard"
                onChange={(e) => setStable(e.target.value === 'true')}
              >
                <MenuItem value={"true"}>Yes</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </TextField>
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="retreats"
                label="Total of retreats in the last twelve months"
                type="number"
                value={retreats}
                variant="standard"
                onChange={(e) => setRetreats(e.target.value)}
                helperText="Suma de retiros en los últimos 12 meses en Pesos Chilenos. Ej: 50000"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="recentRetreats"
                label="Total of retreats in the last six months"
                type="number"
                value={recentRetreats}
                variant="standard"
                onChange={(e) => setRecentRetreats(e.target.value)}
                helperText="Suma de retiros en los últimos 6 meses en Pesos Chilenos. Ej: 25000"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      display: 'none', },
  
                  '& input[type=number]': {MozAppearance: 'textfield',},
                }}
              />
          </FormControl>

          <FormControl fullWidth>
              <TextField
                id="deposits"
                label="Total of deposits in the last twelve months"
                type="number"
                value={deposits}
                variant="standard"
                onChange={(e) => setDeposits(e.target.value)}
                helperText="Suma de depósitos en los últimos 12 meses en Pesos Chilenos. Ej: 100000"
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
                onClick={(e) => saveClient(e)}
                startIcon={<SaveIcon />}
              >
                Registrar
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
export default CreateClient;