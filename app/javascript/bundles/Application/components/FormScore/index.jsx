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
  initial_formation: 0,
  unit_corner_formation: 0,
  progressive_classes_formation: 0,
  specialties_formation: 0,
  events_formation: 0,
  final_formation: 0,
  event_1: 0,
  event_2: 0,
  event_3: 0,
  bonus: 0,
  small_fault: 0,
  moderate_fault: 0,
  serious_fault: 0,
  favor_score: 0,
  points_against: 0,
  total: 0,
  date_at: new Date(),
};

const FormScore = ({ featureFlags }) => {
  const [groups, setGroups] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    isOpen: false,
    status: "",
  });

  const permitsCreateOutDate = featureFlags.includes("permits_create_out_date");

  const {
    control,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isValid: isFormValid, isDirty },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const today = new Date();
  const isWeekDay = ![0,6].includes(today.getDay())

  const { date_at: dateAt } = watch()
  let dayNumber = permitsCreateOutDate ? new Date(dateAt).getDay() : today.getDay();

  const isSunday = dayNumber == 0;
  const isSaturday = dayNumber == 6;

  useEffect(() => {
    axios
      .get("/v1/groups")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const isValid = Object.keys(errors).length === 0 && isFormValid;

  const onSubmit = async (data) => {
    try {
      await axios.post("/v1/scores", { score: data });
      setSnackbar({
        status: "success",
        isOpen: true,
        message: "Puntaje guardado",
      });
      reset({
        data: DEFAULT_VALUES,
      });
    } catch (error) {
      setSnackbar({
        status: "error",
        isOpen: true,
        message: "Ocurrio un error registrar el puntaje",
      });
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

    setSnackbar({ ...snackbar, isOpen: false });
  };

  const disabledWeekDays = (date) => {
    return ![0,6].includes(date.getDay())
  }

  if (isWeekDay && !permitsCreateOutDate) {
    return (
      <Layout>
        <Alert severity="info">No es posible crear registros en dias de la semana</Alert>
      </Layout>
    )
  }

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
        {permitsCreateOutDate && (
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
                    disableFuture
                    shouldDisableDate={disabledWeekDays}
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
        )}

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
        {isSaturday && (
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
        )}
        {isSunday && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Controller
                name="event_1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    error={!!errors?.event_1}
                    helperText={errors?.event_1?.message}
                    fullWidth
                    label="Evento 1"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="event_2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    error={!!errors?.event_2}
                    helperText={errors?.event_2?.message}
                    fullWidth
                    label="Evento 2"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="event_3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    error={!!errors?.event_3}
                    helperText={errors?.event_3?.message}
                    fullWidth
                    label="Evento 3"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              name="initial_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.initial_formation}
                  helperText={errors?.initial_formation?.message}
                  fullWidth
                  label="Formacion inicial"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="unit_corner_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.unit_corner_formation}
                  helperText={errors?.unit_corner_formation?.message}
                  fullWidth
                  label="Formacion rincón de unidades"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="progressive_classes_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.progressive_classes_formation}
                  helperText={errors?.progressive_classes_formation?.message}
                  fullWidth
                  label="Formacion clases progresivas"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              name="specialties_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.specialties_formation}
                  helperText={errors?.specialties_formation?.message}
                  fullWidth
                  label="Formacion para especialidades"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="events_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.events_formation}
                  helperText={errors?.events_formation?.message}
                  fullWidth
                  label="Formacion para eventos"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="final_formation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors?.final_formation}
                  helperText={errors?.final_formation?.message}
                  fullWidth
                  label="Formacion final"
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
      <Snackbar open={snackbar.isOpen} autoHideDuration={6000}>
        <Alert
          onClose={handleClose}
          severity={snackbar.status}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

FormScore.propTypes = {
  featureFlags: PropTypes.array.isRequired, // this is passed from the Rails view
};

export default FormScore;
