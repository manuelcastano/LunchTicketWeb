import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const card = (
  <React.Fragment >
    <CardContent >
    <TextField id="standard-basic" label="Codigo del estudiante" variant="standard" />
    </CardContent>
    <CardActions>
      <Button size="small">Buscar</Button>
    </CardActions>
  </React.Fragment>
);
export default function AddStudent() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}