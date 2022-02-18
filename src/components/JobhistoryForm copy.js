import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  AspectRatio,
  Box,
  //Button,
  ButtonGroup,
  Center,
  Checkbox,
  Container,
  //Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Wrap,
  WrapItem,
  useRadio,
  useRadioGroup,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as emailjs from "emailjs-com";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { makeStyles } from "@material-ui/core/styles";
import { useCustomToast } from "../helpers/useCustomToast";
import { useEmployees } from "./employees/useEmployees";
import { Controller, useForm } from "react-hook-form";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const initial_state = {
  name: "",
  position: "",
  department: "",
  effectdate: "",
  remark: "",
  status: "",
};

const JobhistoryForm = ({
  state,
  setState,
  statustype,
  add_Item,
  update_Item,
  onJobClose,
}) => {
  const toast = useCustomToast();
  const classes = useStyles();
  const field_width = "120";
  const { employees } = useEmployees();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { handleSubmit, control } = useForm();

  const onSubmit = (values) => {
    if (statustype === "edit") {
      update_Item(values);
    }
    if (statustype === "add") {
      add_Item(values);
    }
  };

  const handleClose = () => {
    onJobClose();
  };

  // useEffect(() => {
  //   setState(initial_state);
  //   setState({ ...formdata });
  //   setState({ ...formdata });
  //   console.log("laeve form",state)
  // }, [initialValues]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          EMPLOYMENT HISTORY FORM
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
                    id="margin-normal-name"
                    name="name"
                    defaultValue={state.status}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="position"
              control={control}
              defaultValue={state.position}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Position"
                    id="margin-normal-pos"
                    name="position"
                    defaultValue={state.position}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="department"
              control={control}
              defaultValue={state.department}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Department"
                    id="margin-normal-dept"
                    name="department"
                    defaultValue={state.department}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="Effective Date"
              control={control}
              defaultValue={state.effectdate}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Effective Date"
                    type="date"
                    id="margin-normal-effectdate"
                    name="effectdate"
                    defaultValue={state.from_date}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                );
              }}
              rules={{ required: "Date is required" }}
            />
          </div>

          <div>
            <Controller
              name="status"
              control={control}
              defaultValue={state.status}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Status"
                    id="margin-normal-status"
                    name="status"
                    defaultValue={state.status}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="remark"
              control={control}
              defaultValue={state.remark}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Remark"
                    id="margin-normal-remark"
                    name="remark"
                    defaultValue={state.remark}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      readOnly: true,
                    }}
                    // select
                  >
                    {/* <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
                    <MenuItem value="Approve">Approve</MenuItem>
                    <MenuItem value="Reject">Reject</MenuItem> */}
                  </TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
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
              Submit <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </form>
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

export default JobhistoryForm;
