import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Config {
  selectedVariable: number;
  graficos: Array<object>;
}

const WeatherChart: React.FC<Config> = ({ selectedVariable, graficos }) => {
  const [dato, setDato] = useState<Array<object>>([]);

  useEffect(() => {
    setDato(graficos);
  }, [graficos]);

  const data = dato.map((row: any) => ({
    hora: row.hour,
    precipitacion: parseFloat(row.precipitation),
    humedad: parseInt(row.humidity),
    nubosidad: parseInt(row.clouds)
  }));

  let filteredData;

  if (selectedVariable >= 0) {
    const selectedKey = ["precipitacion", "humedad", "nubosidad"][selectedVariable];
    filteredData = data.map(row => ({
      hora: row.hora,
      [selectedKey]: row[selectedKey as keyof typeof row]
    }));
  } else {
    filteredData = data;
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" gutterBottom>
      TENDENCIAS CLIMATICAS
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
          <XAxis dataKey="hora" tick={{ fill: '#8884d8' }} />
          <YAxis tick={{ fill: '#8884d8' }} />
          <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: 'none' }} />
          <Legend wrapperStyle={{ color: '#8884d8' }} />
          {selectedVariable === -1 ? (
            <>
              <Line type="monotone" dataKey="precipitacion" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="humedad" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="nubosidad" stroke="#ffc658" strokeWidth={2} activeDot={{ r: 8 }} />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey={["precipitacion", "humedad", "nubosidad"][selectedVariable]}
              stroke={["#8884d8", "#82ca9d", "#ffc658"][selectedVariable]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default WeatherChart;