import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Context } from "../../context/ContextProvider";
import PageTemplate from "../../templates/PageTemplate";

const DraftBoard = () => {
  // ---------------------------------- HOOKS ----------------------------------
  const { draftPicks } = useContext(Context);

  return (
    <PageTemplate>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(draftPicks[0]).map((field) => (
                <TableCell align="right" key={field}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {draftPicks?.map((pick, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.values(pick).map((value, j) => (
                  <TableCell align="right" key={j}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageTemplate>
  );
};

export default DraftBoard;
