import PropTypes from "prop-types";
import React, { useState } from "react";
import Layout from "../Layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FormScore = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
          Registro de puntuacion
        </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { mt: 1.5, mb: 1.5 },
        }}
      >
        <Autocomplete
          required
          disablePortal
          options={groups}
          renderInput={(params) => <TextField {...params} label="Grupo" />}
        />
        <Typography variant="h6" gutterBottom>
          Puntualidad
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Conquistadores"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Consejeros"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Uniforme
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Bordon"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Uniforme"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
        </Grid>
        <TextField
          required
          id="outlined-required"
          label="Clases Biblicas"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              required
              id="outlined-required"
              label="Formacion 1"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="outlined-required"
              label="Formacion 2"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="outlined-required"
              label="Formacion 3"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
        </Grid>
        <TextField
          required
          id="outlined-required"
          label="Bonus Track"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <Typography variant="h6" gutterBottom sx={{ color: "error.main" }}>
          Puntos en contra
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Faltas Leves"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          required
          id="outlined-required"
          label="Faltas Moderadas"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          required
          id="outlined-required"
          label="Faltas Graves"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <Button variant="contained">Crear</Button>
      </Box>
    </Layout>
  );
};

FormScore.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default FormScore;

const groups = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];
