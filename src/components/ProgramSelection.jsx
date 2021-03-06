import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DropzoneDialogD from "./Upload";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import PSvalidation from "./schemas/PSSchema";
import {
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: "73%",
    border: "3px solid rgba(0, 0, 0, 1)",
  },
  gridCustom: { paddingLeft: "10px", marginTop: "20px" },
  paperC: {
    width: "90%",
    height: "100%",
  },
  textFieldAuto: {
    width: "40%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  parag: {
    position: "relative",
    top: "-13px",
    backgroundColor: "white",
    display: "inline",
    height: "auto",
    fontWeight: "bold",
  },
}));

function ProgramSelection(props) {
  const classes = useStyles();
  const { onNext, onBack, activeStep, steps, click } = props;
  const [Terrors, setErrors] = useState({});

  const [programSelectionState, setProgramSelectionInfo] = useState({
    faculty: "",
    mastersProgram: "",
    expectedEntryTerm: "",
  });

  const handleChange = (event) => {
    setProgramSelectionInfo(event.target.value);
  };

  const validates = () => {
    const result = PSvalidation(programSelectionState);

    if (!result.error) return true;
    var i = 0;
    const newObj = {};

    for (let item of result.error.details) {
      var x = result.error.details[i].path[0];

      newObj[x] = true;
      i++;
    }
    setErrors(newObj);
    return false;
  };

  const submitForm = () => {
    let cont = validates();
    if (cont === true) {
      click(programSelectionState);
      onNext();
    }
  };

  return (
    <center>
      <div style={{ minHeight: "28.1vw" }}>
        <Grid container spacing={0}>
          <Grid item md={12} sm={12} xs={12} className={classes.gridCustom}>
            <Paper
              label="Name"
              square={false}
              variant={"outlined"}
              className={classes.paperC}
              //style={{ marginLeft: "15vw" }}
            >
              <p className={classes.parag}>Program Selection</p>

              <form className={classes.root} noValidate autoComplete="off">
                <FormControl
                  variant="outlined"
                  className={classes.textFieldAuto}
                  size="small"
                >
                  <InputLabel
                    id="outlined-label"
                    style={{ backgroundColor: "white" }}
                  >
                    Faculty
                  </InputLabel>
                  <Select
                    error={"faculty" in Terrors ? true : false}
                    labelId="outlined-label"
                    id="outlined"
                    value={programSelectionState.faculty}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setProgramSelectionInfo({
                        ...programSelectionState,
                        faculty: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"Computer Science"}>
                      Computer Science
                    </MenuItem>
                    <MenuItem value={"Law"}>Law</MenuItem>
                    <MenuItem value={"Example"}>Example</MenuItem>
                    <MenuItem value={"Example2"}>Example</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  variant="outlined"
                  className={classes.textFieldAuto}
                  size="small"
                >
                  <InputLabel
                    id="outlined-label"
                    style={{ backgroundColor: "white" }}
                  >
                    Master's Program
                  </InputLabel>
                  <Select
                    error={"mastersProgram" in Terrors ? true : false}
                    labelId="outlined-label"
                    id="outlined"
                    value={programSelectionState.mastersProgram}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setProgramSelectionInfo({
                        ...programSelectionState,
                        mastersProgram: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  variant="outlined"
                  className={classes.textFieldAuto}
                  size="small"
                  style={{ width: "81.4%" }}
                >
                  <InputLabel
                    id="outlined-label"
                    style={{ backgroundColor: "white" }}
                  >
                    Expected Entry Term
                  </InputLabel>
                  <Select
                    error={"expectedEntryTerm" in Terrors ? true : false}
                    labelId="outlined-label"
                    id="outlined"
                    value={programSelectionState.expectedEntryTerm}
                    onChange={(e) => {
                      setProgramSelectionInfo({
                        ...programSelectionState,
                        expectedEntryTerm: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={"Highschool Dimploma"}>
                      Dummy Data Example 1
                    </MenuItem>
                    <MenuItem value={"Associate's Degree"}>
                      Dummy Data Example 1
                    </MenuItem>
                    <MenuItem value={"Bachelor's Degree"}>
                      Dummy Data Example 1
                    </MenuItem>
                    <MenuItem value={"Master's Degree"}>
                      Dummy Data Example 1
                    </MenuItem>
                  </Select>
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <Button
          disabled={activeStep === 0}
          onClick={onBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={submitForm}
          style={{ backgroundColor: "red" }}
          endIcon={<ArrowRightIcon />}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </center>
  );
}

export default ProgramSelection;
