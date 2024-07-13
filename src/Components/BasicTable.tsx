import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface RowData {
  rangeHours: string | undefined;
  windDirection: string | undefined;
  precipitation: string | null | undefined;
  humidity: string | null | undefined;
  clouds: string | null | undefined;
}

interface Config {
  rows: RowData[];
}

const BasicTable: React.FC<Config> = ({ rows }) => {
  const [tableRows, setTableRows] = useState(rows);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" gutterBottom>
      DATOS METEOROLOGICOS
      </Typography>
      <TableContainer component={Paper} className="table-responsive">
        <Table className="table table-striped table-hover">
          <TableHead className="thead-dark">
            <TableRow>
              <TableCell>Rango de horas</TableCell>
              <TableCell align="right">Dirección del viento</TableCell>
              <TableCell align="right">Precipitación</TableCell>
              <TableCell align="right">Humedad</TableCell>
              <TableCell align="right">Nubes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.rangeHours}
                </TableCell>
                <TableCell align="right">{row.windDirection}</TableCell>
                <TableCell align="right">{row.precipitation}</TableCell>
                <TableCell align="right">{row.humidity}</TableCell>
                <TableCell align="right">{row.clouds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default BasicTable;