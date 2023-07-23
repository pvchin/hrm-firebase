import React, { useState } from "react";
/* import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Divider,
  MenuItem,
} from "@material-ui/core"; */
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Container,
  Divider,
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
  //const classes = useStyles();
  //const label_width = "150";
  const field_width = "180";
  const field_gap = "3";
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
      <Container
        minW="3xl"
        h={{ base: "auto", md: "auto" }}
        py={[0, 0, 0]}
        direction={{ base: "column-reverse", md: "row" }}
        overflowY="scroll"
      >
        <VStack
          w={{ base: "auto", md: "full" }}
          h={{ base: "auto", md: "full" }}
          p="1"
          spacing="10"
          //alignItems="flex-start"
        >
          <VStack py={0} alignItems="center">
            <Heading size="lg">EMPLOYEE EMAIL CONVERSION</Heading>
          </VStack>

          <Divider border="2px solid" borderColor="teal" />
          <Box
            border="1px solid"
            borderColor="teal"
            borderRadius={20}
            p={5}
            w="100%"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={state.name}
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Employee Name"
                            minWidth={field_width}
                          />
                          <Select
                            name="name"
                            value={value}
                            width="100%"
                            onChange={(e) => {
                              onChange(e.target.value);
                              handleSearchEmail(e.target.value);
                            }}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            //placeholder="employee name"
                            minWidth="100"
                            isRequired
                          >
                            <option value="">None</option>
                            {employees &&
                              employees
                                .filter((r) => !r.hasresigned)
                                .sort((a, b) =>
                                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                                )
                                .map((rec) => {
                                  return (
                                    <option key={rec.id} value={rec.name}>
                                      {rec.name}
                                    </option>
                                  );
                                })}
                          </Select>
                        </HStack>
                      </InputGroup>
                    );
                  }}
                />
              </div>
              <Divider border="1px solid" borderColor="teal.100" my={2} />
              <div>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={state.email}
                  rules={{ required: "Email is required" }}
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Current Email"
                            minWidth={field_width}
                          />
                          <Input
                            name="email"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="current email"
                            minWidth="100"
                            isReadOnly
                          />
                        </HStack>
                      </InputGroup>
                    );
                  }}
                />
              </div>
              <Divider border="1px solid" borderColor="teal.100" my={2} />
              <div>
                <Controller
                  name="newemail"
                  control={control}
                  defaultValue={state.newemail}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="New Email"
                            minWidth={field_width}
                          />
                          <Input
                            name="newemail"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="new email"
                            minWidth="100"
                          />
                        </HStack>
                      </InputGroup>
                    );
                  }}
                />
              </div>
              <Divider border="1px solid" borderColor="teal.100" my={2} />
              <div>
                <Controller
                  name="loginpw"
                  control={control}
                  defaultValue={state.loginpw}
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <InputGroup>
                        <HStack w="100%" py={1}>
                          <InputLeftAddon
                            children="Login Email PW"
                            minWidth={field_width}
                          />
                          <Input
                            name="loginpw"
                            value={value}
                            width="full"
                            onChange={onChange}
                            borderColor="gray.400"
                            //textTransform="capitalize"
                            ref={ref}
                            placeholder="login email pw"
                            minWidth="100"
                          />
                        </HStack>
                      </InputGroup>
                    );
                  }}
                  rules={{ required: "Password is required" }}
                />
              </div>

              {/* <div>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit(onSubmit)}
            >
            Convert <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div> */}
              <Divider border="1px solid" borderColor="teal.100" my={2} />
              <Box>
                <Center>
                  <Button
                    mt={4}
                    ml={4}
                    colorScheme="teal"
                    //isLoading={isSubmitting}
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Convert
                  </Button>
                </Center>
              </Box>
              {isExit && (
                <Box>
                  <Heading size="md" pl={2}>
                    Warning! This email already existed!
                  </Heading>
                </Box>
              )}
            </form>
          </Box>
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
        </VStack>
      </Container>
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
