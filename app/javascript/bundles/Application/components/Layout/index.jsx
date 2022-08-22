import React from "react";
import AppBar from "@mui/material/AppBar";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SettingsApplicationsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Valdenses App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 4 }} maxWidth="md">
          {children}
        </Container>
      </main>
    </ThemeProvider>
  );
}
