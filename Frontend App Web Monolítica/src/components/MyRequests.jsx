import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import { TextField, Button, Box, Typography, CircularProgress,} from "@mui/material";
import requestService from "../services/requestService";
import { Link } from "react-router-dom";

const RequestsRut = () => {
  const [requests, setRequests] = useState([]);
  const [rut, setRut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = () => {
    setLoading(true);
    requestService.getRut(rut) 
      .then((response) => {
        console.log("Mostrando tus solicitudes.", response.data);
        setRequests(response.data);
        setError(null);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar tus solicitudes.", error);
        setError("Error al obtener las solicitudes. Verifica el RUT ingresado.");
      })
      .finally(() => {setLoading(false);});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rut) {
      fetchRequests();
    }
  };

  // Función para mapear el estado a un valor legible
  const getStateLabel = (state) => {
    switch (state) {
      case 1:
        return "En Revisión Inicial";
      case 2:
        return "Pendiente de Documentación";
      case 3:
        return "En Evaluación";
      case 4:
        return "Pre-Aprobada";
      case 5:
        return "En Aprobación Final";
      case 6:
        return "Aprobada";
      case 7:
        return "Rechazada";
      case 8:
        return "Cancelada por el Cliente";
      case 9:
        return "En Desembolso";
      default:
        return "Desconocido";
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: 10 }}>
      <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>
        Mis Solicitudes
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ingrese su RUT"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Obtener Solicitudes
        </Button>
      </form>

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {requests.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Rut
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Tipo Préstamo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Monto
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Interés Anual
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Plazo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{request.rut}</TableCell>
                  <TableCell align="center">{request.type}</TableCell>
                  <TableCell align="center">{request.amount}</TableCell>
                  <TableCell align="center">{request.interest}%</TableCell>
                  <TableCell align="center">{request.time} Años</TableCell>
                  <TableCell align="center">{getStateLabel(request.state)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ marginTop: 3 }}>
        <Button component={Link} to="/home" variant="outlined" color="primary">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};
export default RequestsRut;