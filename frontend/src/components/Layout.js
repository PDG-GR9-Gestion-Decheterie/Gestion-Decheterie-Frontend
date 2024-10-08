import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FactoryIcon from "@mui/icons-material/Factory";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import LoginIcon from "@mui/icons-material/Login";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../Endpoints";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        mui.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#1a8b31",
      main: "#1a8b31",
      dark: "#16772a",
      contrastText: "#fff",
    },
  },
});

export default function Layout({ title, content }) {
  const [open, setOpen] = React.useState(true);
  const { logout, userId } = useAuth();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Box
              sx={{ flexShrink: 0, display: "flex", justifyContent: "center" }}
            >
              <img src="/DIRTS_logo.png" alt="Logo" style={{ height: 50 }} />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            {userId && (
              <>
                <ListItemButton href="/ramassages">
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ramassages" />
                </ListItemButton>
                <ListItemButton href="/decheteries">
                  <ListItemIcon>
                    <FactoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Déchèteries" />
                </ListItemButton>
                <ListItemButton href="/vehicules">
                  <ListItemIcon>
                    <LocalShippingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Véhicules" />
                </ListItemButton>
                <ListItemButton href="/contenants">
                  <ListItemIcon>
                    <BreakfastDiningIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contenants" />
                </ListItemButton>
                <ListItemButton href="/employes">
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employés" />
                </ListItemButton>
                <ListItemButton href="/itineraire">
                  <ListItemIcon>
                    <AssistantDirectionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Itinéraire" />
                </ListItemButton>
                {localStorage.getItem("fonction") === '"Secrétaire"' ||
                localStorage.getItem("fonction") === '"Responsable"' ? (
                  <ListItemButton href="/graphiques">
                    <ListItemIcon>
                      <AnalyticsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Graphiques" />
                  </ListItemButton>
                ) : null}
              </>
            )}
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
              Compte
            </ListSubheader>
            {userId ? (
              <>
                <ListItemButton href="/profile">
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profil" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Déconnexion" />
                </ListItemButton>
              </>
            ) : (
              <ListItemButton href="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Connexion" />
              </ListItemButton>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {content}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
