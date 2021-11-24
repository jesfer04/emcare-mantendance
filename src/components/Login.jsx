import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { green, purple } from '@mui/material/colors';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useLazyQuery,
  gql,
} from "@apollo/client";

const LOGIN = gql`
  query Login($user: String!, $password: String!) {
    login(user: $user, password: $password) {
      name
      email
    }
  }
`;

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const theme = createTheme({
    palette: {
        primary: {
          main: purple[500],
        }
      },
});

export const Login = () => {
  //const [state, setstate] = useState(initialState)
  const [login, { data, error, loading }] = useLazyQuery(LOGIN, {
    client: client,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("session")){
        navigate("/")
    }
  }, [navigate]);

  useEffect(() => {
        if(data){
            localStorage.setItem("session", JSON.stringify(data.login))
            navigate('/')
        }
  },[data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      variables: {
        user: data.get("user"),
        password: data.get("password"),
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
