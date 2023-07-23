import React, { useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Divider,
  MenuItem,
} from "@material-ui/core";
import { Box, Heading } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useEmployees } from "./employees/useEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
const initial_state = {
  name: "",
  email: "",
  newemail: "",
  loginpw: "",
};

const ConvertEmpEmail = () => {
  const classes = useStyles();
  //const toast = useCustomToast();
  const { employees } = useEmployees();
  const updateEmployee = useUpdateEmployees();
  const [state, setState] = useState(initial_state);
  const [empdata, setEmpData] = useState({});
  const [isExit, setIsExit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  //const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { ...initial_state },
  });
  //const initialValues = Object.values(initial_state).join("");

  //const {
  //editEmployeeID,
  //employees_loading,
  //deleteEmployee,
  //loadEmployees,
  //setEditEmployeeID,
  //setIsEditingOn,
  //setIsEditingOff,
  //resetSingleEmployee,
  //resetEmployees,
  //getSingleEmployee,
  //} = useEmployeesContext();

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnConfirm = () => {
    console.log("confirm", empdata);
    //const { id, period, empid } = deletestate;

    //delete allows detls
    //console.log("allowsdetls", dailyallowsdetls);
    //dailyallowsdetls
    //.filter((f) => f.empid === empid)
    //.forEach((rec) => {
    // if (rec.period === period && rec.empid === empid) {
    //console.log("del id", rec.id);
    //  deleteDailyAllowsDetls(rec.id);
    // }
    //});
    //delete daily allows
    //deleteDailyAllows(id);
    // toast({
    //   title: `Site Allowances has been successfully deleted!`,
    //   status: "warning",
    // });
  };

  const handleSearchEmail = (data) => {
    console.log("search data", data);
    const currentemail = employees
      .filter((r) => r.name === data)
      .map((rec) => rec.email);
    console.log("searchemail", currentemail[0]);
    setValue("email", currentemail[0]);
  };

  const onSubmit = (data) => {
    setEmpData((prev) => (prev = data));
    handleAlertOpen();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          EMPLOYEE EMAIL CONVERSION
        </Typography>

        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue={state.name}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Name"
                    id="margin-normal"
                    name="name"
                    //value={value}
                    defaultValue={state.name}
                    className={classes.textField}
                    onChange={(e) => {
                      onChange(e.target.value);
                      handleSearchEmail(e.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {employees &&
                      employees
                        .filter((r) => !r.hasresigned)
                        .sort((a, b) =>
                          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                        )
                        .map((rec) => {
                          return (
                            <MenuItem key={rec.id} value={rec.name}>
                              {rec.name}
                            </MenuItem>
                          );
                        })}
                  </TextField>
                );
              }}
              rules={{ required: "Name required" }}
            />
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue={state.email}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Current Email"
                    id="margin-normal-email"
                    name="email"
                    type="email"
                    value={value}
                    defaultValue={state.email}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{ readOnly: true }}
                  />
                );
              }}
              rules={{ required: "Email is required" }}
            />
          </div>
          <div>
            <Controller
              name="newemail"
              control={control}
              defaultValue={state.newemail}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="New Email"
                    id="margin-normal-email"
                    name="newemail"
                    type="email"
                    defaultValue={state.newemail}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              rules={{ required: "Email is required" }}
            />
          </div>
          <div>
            <Controller
              name="loginpw"
              control={control}
              defaultValue={state.loginpw}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Login EMail PW"
                    id="margin-normal-email"
                    name="loginpw"
                    defaultValue={state.loginpw}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              rules={{ required: "Password is required" }}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              Convert <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
          {isExit && (
            <Box>
              <Heading size="md" pl={2}>
                Warning! This email already existed!
              </Heading>
            </Box>
          )}
        </form>
        <div>
          <AlertDialogBox
            onClose={handleAlertClose}
            onConfirm={handleOnConfirm}
            isOpen={isAlertOpen}
            title="Convert Email"
          >
            <h2>Are you sure you want to convert ?</h2>
          </AlertDialogBox>
        </div>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}));

export default ConvertEmpEmail;
