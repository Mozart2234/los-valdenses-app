import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const DEFAULT_VALUES = {
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
  date_at: new Date(),
}

const FormScore = () => {
  const [groups, setGroups] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    isOpen: false,
    status: "",
  });


  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid: isFormValid, isDirty },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    axios
      .get("/v1/groups")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("Errors", errors);

  const isValid = Object.keys(errors).length === 0 && isFormValid;

  const onSubmit = async (data) => {
    try {
      await axios.post("/v1/scores", { score: data });
      setSnackbar({status: "success", isOpen: true, message: "Puntaje guardado"});
      reset({
        data: DEFAULT_VALUES
      })
    } catch (error) {
      setSnackbar({status: "error", isOpen: true, message: "Ocurrio un error registrar el puntaje"});
      const errors = error.response.data;
      Object.keys(errors).forEach((key) => {
        setError(key, { type: "server", message: errors[key].join(",") });
      });
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({...snackbar, isOpen: false});
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
        <Controller
          name="group_id"
          control={control}
          render={({ field: { ref, onChange, ...field } }) => (
            <Autocomplete
              required
              disablePortal
              options={groups}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                onChange(data.id);
              }}
              renderInput={(params) => (
                <TextField
                  inputRef={ref}
                  {...params}
                  {...field}
                  label="Grupo"
                  error={!!errors?.group_id}
                  helperText={errors?.group_id?.message}
                />
              )}
            />
          )}
        />

        <Box>
          <Controller
            name="date_at"
            control={control}
            render={({ field: { ref, onChange, ...field } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  label="Fecha de registro"
                  onChange={(value) => {
                    onChange(value);
                  }}
                  value={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      inputRef={ref}
                      fullWidth
                      error={!!errors?.date_at}
                      helperText={errors?.date_at?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Box>

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
                  error={!!errors?.pathfinder}
                  required
                  fullWidth
                  label="Conquistadores"
                  type="number"
                  helperText={errors?.pathfinder?.message}
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
                  error={!!errors?.counselor}
                  required
                  fullWidth
                  label="Consejeros"
                  type="number"
                  helperText={errors?.counselor?.message}
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
              name="flag"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.flag}
                  helperText={errors?.flag?.message}
                  fullWidth
                  label="Bordon"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="uniform"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors?.uniform}
                  helperText={errors?.uniform?.message}
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
        <Typography variant="h6" gutterBottom>
          Otros
        </Typography>
        <Controller
          name="bible_study"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              error={!!errors?.bible_study}
              helperText={errors?.bible_study?.message}
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
              name="formation_1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.formation_1}
                  helperText={errors?.formation_1?.message}
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
              name="formation_2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.formation_2}
                  helperText={errors?.formation_2?.message}
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
              name="formation_3"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.formation_3}
                  helperText={errors?.formation_3?.message}
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
          name="bonus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              error={!!errors?.bonus}
              helperText={errors?.bonus?.message}
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
          name="small_fault"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              error={!!errors?.small_fault}
              helperText={errors?.small_fault?.message}
              label="Faltas leves"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Controller
          name="moderate_fault"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              error={!!errors?.moderate_fault}
              helperText={errors?.moderate_fault?.message}
              label="Faltas moderadas"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Controller
          name="serious_fault"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              error={!!errors?.serious_fault}
              helperText={errors?.serious_fault?.message}
              label="Faltas graves"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Crear
        </Button>
      </Box>
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity={snackbar.status} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

FormScore.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default FormScore;
