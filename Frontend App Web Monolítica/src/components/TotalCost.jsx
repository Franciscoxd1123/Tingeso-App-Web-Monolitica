import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import requestService from "../services/requestService";
import { Link } from "react-router-dom";

const TotalCost = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCostResult, setTotalCostResult] = useState(null);

    const doTotalCost = () => {
        setLoading(true);
        requestService.getAll()
            .then((response) => {
                const filteredRequests = response.data.filter(request => request.state === 4);
                setRequests(filteredRequests);
                setError(null);
            })
            .catch((error) => {
                console.log("Error al obtener solicitudes:", error);
                setError("Error al obtener solicitudes.");
            })
            .finally(() => setLoading(false));
    };

    const calculateTotalCost = (id) => {
        setLoading(true);
        requestService.totalCost(id)
            .then((response) => {
                setTotalCostResult(response.data);
            })
            .catch((error) => {
                console.log("Error al obtener el costo total:", error);
                setError("Error al obtener el costo total.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        doTotalCost();
    }, []);

    const getStateLabel = (state) => {
        switch (state) {
          case 4:
            return "Pre-Aprobada";
          default:
            return "Desconocido";
        }
    };

    return (
        <Box sx={{ backgroundColor: 'white', padding: 10 }}>
            <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>Costo total</Typography>
            {loading && <CircularProgress sx={{ marginTop: 2 }} />}
            {error && <Typography color="error">{error}</Typography>}
            {requests.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de solicitudes">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Rut Solicitante</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Tipo Préstamo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Monto</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Interés Anual</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Plazo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Estado</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
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
                                        <Button variant="contained" color="primary" onClick={() => calculateTotalCost(request.id)}>
                                            Calcular
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {totalCostResult !== null && (
                <Box sx={{ marginTop: 3 }}>
                     <Typography color="info.main">Costo Total: ${totalCostResult}</Typography>
                </Box>
            )}
            <Box sx={{ marginTop: 3 }}>
                <Button component={Link} to="/home" variant="outlined" color="primary">Back to Home</Button>
            </Box>
        </Box>
    );
};
export default TotalCost;