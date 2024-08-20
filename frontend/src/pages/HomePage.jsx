import { useContext, useState } from "react";
import PageTemplate from "../templates/PageTemplate";
import { Grid, Typography, TextField, Button, Stack } from "@mui/material";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { DRAFT_BOARD_PATH } from "../constants/paths.js";

const HomePage = () => {
  // ---------------------------------- STATE ----------------------------------
  const [isPending, setIsPending] = useState(false);

  // ---------------------------------- HOOKS ----------------------------------
  const { draftId, setDraftId, getDraftInfo, getDraftPicks } =
    useContext(Context);
  const navigate = useNavigate();

  // ---------------------------------- FUNCS ----------------------------------
  const handleInput = (input) => {
    setDraftId(input);
  };

  const handleClick = async () => {
    setIsPending(true);

    const { status: draftInfoStatus } = await getDraftInfo();

    //sequentially executing fetches
    if (draftInfoStatus < 400) {
      const { status: draftPicksStatus } = await getDraftPicks();

      draftPicksStatus < 400 && navigate(DRAFT_BOARD_PATH);
    }

    setIsPending(false);
  };

  // ---------------------------------- RENDER ---------------------------------
  return (
    <PageTemplate>
      <Grid container rowSpacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Welcome to Your Draft Assistant
          </Typography>
        </Grid>
        <Typography variant="subtitle2">
          Example: 1121618833229307904
        </Typography>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label="Draft ID"
              variant="outlined"
              placeholder="Enter A Draft ID"
              onChange={(e) => handleInput(e.target.value)}
              color="primary"
              sx={{ width: 200 }}
            />
            <Button
              variant="outlined"
              onClick={handleClick}
              disabled={isPending || !draftId}
              sx={{ width: 200 }}
            >
              {isPending ? "Loading" : "Open Draft"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default HomePage;
