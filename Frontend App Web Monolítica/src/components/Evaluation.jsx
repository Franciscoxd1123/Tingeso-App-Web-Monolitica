import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import requestService from "../services/requestService";
import { Link } from "react-router-dom";

const Evaluation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const doEvaluation = () => {
    setLoading(true);
    requestService.getAll()
      .then((response) => {
        const filteredRequests = response.data.filter(request => request.state === 3);
        setRequests(filteredRequests);
        setError(null);
      })
      .catch((error) => {
        console.log("Error al obtener las solicitudes:", error);
        setError("Error al obtener las solicitudes.");
      })
      .finally(() => setLoading(false));
  };

  const evaluateRequest = (id) => {
    setLoading(true);
    requestService.evaluation(id)
        .then((response) => {
            console.log("Resultado de la evaluación:", response.data);
            setEvaluationResult(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch((error) => {
            console.log("Error al evaluar la solicitud:", error);
            setError("Error al evaluar la solicitud.");
        })
        .finally(() => setLoading(false));
  };


  useEffect(() => {
    doEvaluation();
  }, []);

  const getStateLabel = (state) => {
    switch (state) {
      case 3:
        return "En Evaluación";
      case 4:
        return "Pre-Aprobada";
      case 7:
        return "Rechazada";
      default:
        return "Desconocido";
    }
  };

  const getStateColor = (state) => {
    switch (state) {
      case 4:
        return 'success.main';
      case 7:
        return 'warning.main';
      default:
        return 'textPrimary';
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: 10 }}>
      <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>Solicitudes en Evaluación</Typography>
      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}
      {requests.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="requests table">
            <TableHead>
              <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Rut Solicitante
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
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell align="center">{request.rut}</TableCell>
                  <TableCell align="center">{request.type}</TableCell>
                  <TableCell align="center">{request.amount}</TableCell>
                  <TableCell align="center">{request.interest}%</TableCell>
                  <TableCell align="center">{request.time} Años</TableCell>
                  <TableCell align="center">{getStateLabel(request.state)}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => evaluateRequest(request.id)}>
                      Evaluar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {evaluationResult && (
        <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" color="textPrimary">Resultado de la Evaluación:</Typography>
            <Typography color="info.main">Rut Solicitante: {evaluationResult.rut}</Typography>
            <Typography color="info.main">Tipo préstamo: {evaluationResult.type}</Typography>
            <Typography color={getStateColor(evaluationResult.state)}>
                Estado: {getStateLabel(evaluationResult.state)}
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
};

export default Evaluation;