import PropTypes from "prop-types";
import React, { useState } from "react";
import Layout from "../Layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const FormScore = (props) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      group_id: undefined,
      pathfinder: 0,
      counselor: 0,
      flag: 0,
      uniform: 0,
      bible_study: 0,
      formation_1: 0,
      formation_2: 0,
      formation_3: 0,
      bonus: 0,
      small_fault: 0,
      moderate_fault: 0,
      serious_fault: 0,
      favor_score: 0,
      points_against: 0,
      total: 0,
      date_at: 0
    }  
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/v1/scores", { score: data });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
        onSubmit={handleSubmit(onSubmit)}
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
            <Controller
              name="pathfinder"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Conquistadores"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Consejeros"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Uniforme
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Consejeros"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Uniforme"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name="counselor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Clases Biblicas"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Formacion 1"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Formacion 1"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="counselor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Formacion 3"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name="counselor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Bonus Track"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Typography variant="h6" gutterBottom sx={{ color: "error.main" }}>
          Puntos en contra
        </Typography>
        <Controller
          name="counselor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Faltas leves"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Controller
          name="counselor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Faltas moderadas"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Controller
          name="counselor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Faltas graves"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Button variant="contained" type="submit">
          Crear
        </Button>
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
