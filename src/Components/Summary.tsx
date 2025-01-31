import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import sunrise from '../assets/sunrise.jpeg'
export default function Summary() {



    return (
        <Card sx={{ maxWidth: 345 } }>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunrise}
                    alt="Amanecer"
                />
                <CardContent >
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        Amanaecer
                    </Typography>
                    <Typography component="p" variant="h4">
                        05:19:08
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	en 17 Junio, 2024
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}