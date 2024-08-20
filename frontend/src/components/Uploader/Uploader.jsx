import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
  Link,
  IconButton,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DATA_PATH } from "../../constants/paths";

const Uploader = () => {
  const uploadsPath = DATA_PATH + "/uploads";
  const [uploads, setUploads] = useState([]);

  const [file, setFile] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const fileInputRef = useRef(null);

  const handleSelectChange = (e) => {
    console.log(e);
    setFileValue(e.target.value);
  };

  const handleFileChange = (event) => {
    console.log(event);
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !fileValue) {
      alert("Please select a File to Upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      //Complete Upload
      await axios.post(`/v1/upload/file/${fileValue}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update Upload Date record in uploads.json
      const { data } = await axios.put(`${uploadsPath}/${fileValue}`);
      setUploads(data);

      //TODO: Change top MUI Alert
      alert("File uploaded successfully!");

      //Reset State
      setFile(null);
      setFileValue("");

      fileInputRef.current.value = ""; // Clear the file input value
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload file: ", error);
    }
  };

  const buildList = (uploads) => {
    const buildlistItem = (upload, index) => (
      <List sx={{ width: "100%", maxWidth: 360 }} key={index} dense>
        <ListItem
          secondaryAction={
            <Link
              href={upload.link}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <IconButton edge="end" aria-label="Go">
                <OpenInNewIcon />
              </IconButton>
            </Link>
          }
        >
          <ListItemText
            primary={upload.label}
            secondary={`Last Updated: ${upload.lastUploadDate || "Never"}`}
          />
        </ListItem>
      </List>
    );

    return (
      <>
        <Grid item xs={6}>
          {uploads.map(
            (upload, index) =>
              (index + 2) % 2 === 0 && buildlistItem(upload, index)
          )}
        </Grid>
        <Grid item xs={6}>
          {uploads.map(
            (upload, index) =>
              !((index + 2) % 2 === 0) && buildlistItem(upload, index)
          )}
        </Grid>
      </>
    );
  };

  useEffect(() => {
    const getUploads = async () => {
      try {
        const { data } = await axios.get(uploadsPath);
        setUploads(data);
      } catch (e) {
        console.log(`Error: Couldn't retrieve uploads. ${e}`);
      }
    };

    getUploads();
  }, []);

  return (
    <Grid container rowGap={1}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold">
          Upload Manager
        </Typography>
      </Grid>
      {buildList(uploads)}
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight="bold">
          Upload New Data
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select File to Upload
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fileValue} // Use fileValue state here
            label="Select File to Upload"
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>Make a Selection</em>
            </MenuItem>
            {uploads?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={fileInputRef}
          type="file"
          onChange={handleFileChange}
          disabled={!fileValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!file || !fileValue} // Disable if no file or option selected
        >
          Upload File
        </Button>
      </Grid>
    </Grid>
  );
};

export default Uploader;
