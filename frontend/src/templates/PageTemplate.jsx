import { Container, Grid, Alert } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";

const PageTemplate = (props) => {
  const { children } = props;

  const { alertMessages, setAlertMessages } = useContext(Context);

  const handleAlertClose = () => {
    setAlertMessages([]);
  };
  
  return (
    <Container
      sx={{
        p: 5,
        display: "flex",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          {alertMessages.length > 0 && (
            <Alert severity="error" onClose={handleAlertClose}>
              {alertMessages.map((message, i) => {
                return (
                  <>
                    <span key={i}>{message}</span>
                    <br />
                  </>
                );
              })}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageTemplate;
