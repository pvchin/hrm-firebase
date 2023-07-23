import React, { useState, useEffect } from "react";
import {
  //AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  Heading,
  //Image,
  Input,
  InputLeftAddon,
  InputGroup,
  Select,
  //Stack,
  HStack,
  VStack,
  //Wrap,
  useDisclosure,
} from "@chakra-ui/react";
//import * as emailjs from "emailjs-com";
//import { useRecoilState } from "recoil";
//import { loginLevelState } from "./data/atomdata";
//import { makeStyles } from "@material-ui/core/styles";
import { useCustomToast } from "../helpers/useCustomToast";
import { useNavigate } from "react-router-dom";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { Controller, useForm } from "react-hook-form";
import { useEmployees } from "./employees/useEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
import { useHoc } from "./hoc/useHoc";
import { useUpdateHoc } from "./hoc/useUpdateHoc";
import App from "../utils/firebase";

const initial_state = {
  name: "",
  email: "",
  newemail: "",
  pw: "",
};

const EmailConversion = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const field_width = "40";
  const [state, setState] = useState(initial_state);
  const [empid, setEmpId] = useState("");
  const { employees, setEmployeeId } = useEmployees();
  const updateEmployees = useUpdateEmployees();
  const { hoc, setHocId } = useHoc();
  const updateHoc = useUpdateHoc();

  const {
    handleSubmit,
    control,
    //register,
    //reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm({ defaultValues: state });

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const handleEmail = (value) => {
    const data = employees.filter((r) => r.name === value);
    console.log("emp", data);
    setEmpId((prev) => (prev = data[0].id));
    setValue("email", data[0].email);
  };

  const handleOnSubmit = () => {
    const newemail = getValues("newemail");
    const isexit = employees.filter((r) => r.email === newemail);
    if (isexit.length > 0) {
      toast({
        title: `${newemail} is Existed!`,
        status: "warning",
      });
    } else {
      onAlertOpen();
    }
  };

  const handleConvertConfirm = () => {
    const newemail = getValues("newemail");
    const newpw = getValues("pw");
    const empdata = employees.filter((r) => r.id === empid);
    const { Calculation, ...fields } = empdata[0];
    const updEmpdata = { ...fields, email: newemail };
    //create firebase email
    createEmail({ email: newemail, pw: newpw });
    //update emp record
    //console.log("updemp", updEmpdata)
    updateEmployees({ id: empid, ...updEmpdata });
    //update hoc
    hoc &&
      hoc
        .filter((r) => r.empid === empid)
        .forEach((rec) => {
          const updrec = { ...rec, email: newemail };
          updateHoc({ id: rec.id, ...updrec });
        });
    // initial state
    setState((prev) => (prev = { ...initial_state }));
    setValue("email", "");
    setValue("name", "");
    setValue("newemail", "");
    setValue("pw", "");
  };

  /* const handleExit = () =>{
    navigate("/")
  } */

  const createEmail = ({ email, pw }) => {
    try {
      App.auth().createUserWithEmailAndPassword(email, pw);
      toast({
        title: "New Email created!",
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEmployeeId(empid);
    setHocId(empid);
  }, [empid]);

  return (
    <Container minW="container.lg" minH={900}>
      <Box pl={3}>
        <Center>
          <Heading size="md">EMPLOYEE EMAIL CONVERSION</Heading>
        </Center>
      </Box>
      <Box py={2}>
        <Divider borderWidth={1} borderColor="teal" py={0} />
      </Box>
      <Center>
        <Box>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <VStack
              alignItems="flex-start"
              px={5}
              py={5}
              m={5}
              borderRadius="20"
              border="1px solid teal"
            >
              <FormControl>
                <Controller
                  control={control}
                  name="name"
                  fontSize="20"
                  //defaultValue={email}

                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Employee Name"
                          minWidth={field_width}
                          bgColor="gray.300"
                        />
                        <Select
                          name="name"
                          value={value || ""}
                          width="full"
                          onChange={(e) => {
                            onChange(e);
                            handleEmail(e.target.value);
                          }}
                          borderColor="gray.400"
                          //textTransform="capitalize"
                          ref={ref}
                          //placeholder="category"
                        >
                          <option value="">None</option>

                          {employees &&
                            employees.map((rec) => {
                              return (
                                <option key={rec.id} value={rec.name}>
                                  {rec.name}
                                </option>
                              );
                            })}
                        </Select>
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <Controller
                  control={control}
                  name="email"
                  fontSize="20"
                  //defaultValue={curremail}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Current Email"
                          minWidth={field_width}
                          bgColor="gray.300"
                        />
                        <Input
                          name="email"
                          type="email"
                          value={value}
                          fontSize="20"
                          onChange={(e) => {
                            onChange(e);
                          }}
                          bgColor="white"
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="current email"
                          readOnly
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <Controller
                  control={control}
                  name="newemail"
                  fontSize="20"
                  //defaultValue={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="New Email"
                          minWidth={field_width}
                          bgColor="gray.300"
                        />
                        <Input
                          name="newemail"
                          type="email"
                          value={value}
                          fontSize="20"
                          onChange={(e) => {
                            onChange(e);
                          }}
                          bgColor="white"
                          textTransform="lowercase"
                          ref={ref}
                          isRequired
                          placeholder="new email"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <Controller
                  control={control}
                  name="pw"
                  fontSize="20"
                  //defaultValue={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        <InputLeftAddon
                          children="Login Email PW"
                          minWidth={field_width}
                          bgColor="gray.300"
                        />
                        <Input
                          name="pw"
                          //type="password"
                          value={value}
                          fontSize="20"
                          onChange={(e) => {
                            onChange(e);
                          }}
                          bgColor="white"
                          textTransform="lowercase"
                          ref={ref}
                          isRequired
                          placeholder="new login email password"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
            </VStack>
            <HStack align="center" justify="center" px={5}>
              <Button
                variant="solid"
                isFullWidth
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                borderRadius={10}
              >
                Convert
              </Button>
            </HStack>
          </form>
        </Box>
        <AlertDialogBox
          onClose={onAlertClose}
          onConfirm={handleConvertConfirm}
          isOpen={isAlertOpen}
          title="Email Conversion"
        >
          <Heading size="md">Are you sure you want to proceed ?</Heading>
        </AlertDialogBox>
      </Center>
    </Container>
  );
};

export default EmailConversion;
