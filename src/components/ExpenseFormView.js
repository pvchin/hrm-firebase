import React, { useState, useEffect } from "react";
import { Button,  TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import * as emailjs from "emailjs-com";
import axios from "axios";
import currency from "currency.js";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
//import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import {
  Box,
  Image,
  IconButton,
  HStack,
  VStack,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { viewImageState } from "../components/data/atomdata";
import { loginLevelState } from "./data/atomdata";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
//import { useExpenses } from "./expenses/useExpenses";
import { useAddExpenses } from "./expenses/useAddExpenses";
import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";
import { useExpensesAttachments } from "./expensesattachments/useExpensesAttachments";

const FileViewers = React.lazy(() => import("../helpers/FileViewers"));

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;
const UPLOADURL = "https://api.cloudinary.com/v1_1/dlmzwvakr/image/upload";
//const DOWNLOADURL = "https://res.cloudinary.com/v1_1/dlmzwvakr/image/upload";
const UPLOADPRESET = "appsmiths";
// const initial_values = {
//   name: "",
//   date: "",
//   purchased_date: "",
//   purchased_from: "",
//   description: "",
//   remark: "",
//   status: "Pending",
//   amount: 0,
//};

const ExpenseForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const toast = useCustomToast();
  //const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  //const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const addExpenses = useAddExpenses();
  //const delExpenses = useDeleteExpenses();
  const { expensesattachments, setAttachmentId } = useExpensesAttachments();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { isExpenseEditing, editExpenseID } = useExpensesContext();
  const [files, setFiles] = useState([]);
  const [filename, setFilename] = useState("");
  const [newFile, setNewFile] = useState({});
  const [image, setImage] = useRecoilState(viewImageState);
  const {
    isOpen: isViewImageOpen,
    onOpen: onViewImageOpen,
    onClose: onViewImageClose,
  } = useDisclosure();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...formdata,
    },
  });

  //console.log("formdata", formdata);
  //console.log("files", files);

  /* const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOADPRESET);
      axios({
        url: UPLOADURL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      })
        .then((res) => {
          //console.log("res", res.data);
          // Object.assign(file, {
          //   preview: res.data.url,
          // });
          setFiles(
            (prev) =>
              (prev = [
                ...files,
                ...[
                  { name: res.data.original_filename, preview: res.data.url },
                ],
              ])
          );
        })
        .catch((err) => {
          setNewFile({});
          console.log(err);
        });
      // Object.assign(file, {
      //   preview: URL.createObjectURL(file),
      // });
    });

    //const allfiles = [...files, ...acceptedFiles];
    //setFiles(allfiles);
  }; */

  /* const upLoad = () => {
    const uploadURL = "https://api.cloudinary.com/v1_1/dlmzwvakr/image/upload";
    const uploadPreset = "appsmiths";

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      axios({
        url: uploadURL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      })
        .then((res) => {
          setFilename((prev) => (prev = res.data.public_id));
          console.log(res.data.public_id);
          //console.log("filename", filename);
        })
        .catch((err) => console.log(err));
    });
  }; */

  /* const handleSentEmail = (data) => {
    const { date } = data;
    //console.log("expense form", loginLevel);
    var emaildata = {
      to_name: loginLevel.loginUser,
      to_email: loginLevel.loginEmail,
      message: `Your expenses claim application dated on ${date} has been successfully submitted for approval`,
      cc_to: loginLevel.reporting_email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emaildata, USER_ID).then(
      function (response) {
        //console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${emaildata.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${emaildata.to_email}!`,
          status: "warning",
        });
      }
    );
  }; */

  const onSubmit = (data, e) => {
    e.preventDefault();
    //console.log("onSubmit", isExpenseEditing);
    let newData = {
      ...data,
      attachment1_name: files.length >= 1 ? files[0].name : "",
      attachment1_url: files.length >= 1 ? files[0].preview : "",
      attachment2_name: files.length >= 2 ? files[1].name : "",
      attachment2_url: files.length >= 2 ? files[1].preview : "",
      attachment3_name: files.length >= 3 ? files[2].name : "",
      attachment3_url: files.length >= 3 ? files[2].preview : "",
    };
    console.log("newdata", newData);
    console.log("isEditing", isExpenseEditing);
    if (isExpenseEditing) {
      //console.log("edit");
      const { rec_id, tableData, ...editData } = newData;
      updateExpenses({ id: editExpenseID, ...editData });
    } else {
      //console.log("new");
      addExpenses({
        ...newData,
        empid: loginLevel.loginUserId,
        name: loginLevel.loginUser,
      });
    }
    // if (isExpenseEditing) {
    //   const { rec_id, tableData, ...editData } = newData;
    //   console.log("edit", ...editData);
    //   updateExpenses({ id: editExpenseID, ...editData });
    // } else {
    //   console.log("new");
    //   addExpenses({
    //     ...newData,
    //     empid: loginLevel.loginUserId,
    //     name: loginLevel.loginUser,
    //   });
    //   handleSentEmail(data);
    // }

    handleDialogClose();
  };

  const handleViewImage = ({ preview, name }) => {
    const newImage = { url: preview, name: name };
    setImage((prev) => newImage);
    onViewImageOpen();
  };

  useEffect(() => {
    if (isExpenseEditing) {
      setAttachmentId(formdata.attachmentid);
      const newData = expensesattachments
        .filter((rec) => rec.attachmentid === formdata.attachmentid)
        .map((rec) => {
          return {
            name: rec.name,
            preview: rec.url,
          };
        });
      
      setFiles(newData);
    } else {
      setFiles([]);
    }
  }, [expensesattachments]);

  return (
    <div>
      <Box size="x1">
        <Typography variant="h5" component="h3">
          EXPENSES CLAIM FORM
        </Typography>
        <Typography component="p">Expense Claim Application</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={formdata.name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Name"
                        id="margin-normal1"
                        name="name"
                        defaultValue={formdata.name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                />
              </div>
              <div>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={formdata.date}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Date"
                        type="date"
                        id="margin-normal2"
                        name="formdata.date"
                        value={value}
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
                  rules={{ required: "From Date is required" }}
                />
              </div>

              <div>
                <Controller
                  name="purchased_from"
                  control={control}
                  defaultValue={formdata.purchased_from}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Purchased From"
                        id="margin-normal3"
                        name="purchased_from"
                        defaultValue={formdata.purchased_from}
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
                  name="description"
                  control={control}
                  defaultValue={formdata.description}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Description"
                        id="margin-normal4"
                        name="description"
                        defaultValue={formdata.description}
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
                  name="amount"
                  control={control}
                  defaultValue={formdata.amount}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      // <TextField
                      //   label="Amount"
                      //   type="number"
                      //   id="standard-number1"
                      //   name="amount"
                      //   defaultValue={formdata.amount}
                      //   className={classes.textField}
                      //   //onChange={onChange}
                      //   onChange={(e) => {
                      //     onChange(parseInt(e.target.value, 10));
                      //   }}
                      //   error={!!error}
                      //   helperText={error ? error.message : null}
                      // />
                      <CurrencyTextField
                        label="Amount"
                        variant="standard"
                        value={formdata.amount}
                        currencySymbol="$"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces="2"
                        className={classes.textField}
                        id="standard-amount"
                        name="amount"
                        style={{ width: 100 }}
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseFloat(currency(e.target.value), 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="remark"
                  control={control}
                  defaultValue={formdata.remark}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Remark"
                        id="margin-normal5"
                        name="remark"
                        defaultValue={formdata.remark}
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
                  name="status"
                  control={control}
                  defaultValue={formdata.status}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Status"
                        id="margin-normal6"
                        name="status"
                        defaultValue={formdata.status}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                  //rules={{ required: "Status is required" }}
                />
              </div>
              {/* <div>
                <Controller
                  name="attachment1_name"
                  control={control}
                  defaultValue={files.length >= 1 ? files[0].name : ""}
                  defaultValue={formdata.attachment1_name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Attachment #1"
                        id="margin-normal6"
                        name="attachment1_name"
                        defaultValue={files.length >= 1 ? files[0].name : ""}
                        defaultValue={formdata.attachment1_name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                />
              </div> */}
              {/*  <div>
                <Controller
                  name="attachment2_name"
                  control={control}
                  defaultValue={formdata.attachment2_name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Attachment #2"
                        id="margin-normal6"
                        name="attachment2_name"
                        defaultValue={formdata.attachment2_name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                />
              </div> */}
              {/* <div>
                <Controller
                  name="attachment3_name"
                  control={control}
                  defaultValue={formdata.attachment3_name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Attachment #3"
                        id="margin-normal6"
                        name="attachment3_name"
                        defaultValue={formdata.attachment3_name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                />
              </div> */}

              <div>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  //onClick={() => handleSubmit(onSubmit)()}
                >
                  Save <Icon className={classes.rightIcon}>send</Icon>
                </Button> */}
              </div>
            </GridItem>
            <GridItem colSpan={2}>
              {/* <ImageUpload files={files} setFiles={setFiles} onDrop={onDrop} /> */}
              {files
                .filter((rec) => rec.name !== undefined && rec.name !== null)
                .map((file) => {
                  return (
                    <Box
                      display="inline-flex"
                      w="50%"
                      h={150}
                      mb={8}
                      mr={8}
                      p={4}
                      border="1px solid #eaeaea"
                      borderRadius={2}
                      key={file.name}
                    >
                      <HStack p={5}>
                        <Image
                          src={file.preview}
                          alt={file.name}
                          display="block"
                          w="auto"
                          h="100%"
                        />
                        <VStack>
                          <IconButton
                            size="sm"
                            aria-label="view image"
                            icon={<FiEye />}
                            onClick={() =>
                              handleViewImage({
                                preview: file.preview,
                                name: file.name,
                                type: file.preview.split(".").pop(),
                              })
                            }
                          />
                          {/* <IconButton
                            size="sm"
                            aria-label="delete image"
                            icon={<FiTrash2 />}
                            onClick={() => handleDelImage(file.name)}
                          /> */}
                        </VStack>
                      </HStack>
                    </Box>
                  );
                })}
            </GridItem>
          </Grid>
        </form>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isViewImageOpen}
        onClose={onViewImageClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{image.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display="inline-flex"
              w="100%"
              h="800"
              mb={8}
              mr={8}
              p={4}
              border="1px solid #eaeaea"
              borderRadius={2}
            >
              <FileViewers imagefile={image} />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onViewImageClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

export default ExpenseForm;
