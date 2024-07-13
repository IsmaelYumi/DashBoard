import { ColorizeSharp } from "@mui/icons-material";
import { Box, ThemeProvider, Typography } from "@mui/material";

interface Colores {
  main: String;
  hover: String;
  texto: String
}
export default function Seccion(color: Colores) {
  return (
      <Box
        component={"div"}
        sx={{
          width: "100%",
          height: 100,
          borderRadius: 1,
          backgroundColor: `${color.main}`,
          justifyContent: 'center',

          alignItems: 'center',
          
        }}
      >
        <Typography variant="h4" color="primary">
        {color.texto}
      </Typography>

        
      </Box>
  );
}
