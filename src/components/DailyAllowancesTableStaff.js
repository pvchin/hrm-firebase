import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, Button, MenuItem } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCustomToast } from "../helpers/useCustomToast";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  allowsDataDetlsState,
  allowsDataIdState,
  empidState,
  loginLevelState,
} from "./data/atomdata";
import { AlertDialog } from "../helpers/AlertDialog";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import DailyAllowancesAddPeriod from "./DailyAllowancesAddPeriod";
import DailyAllowsDetlsTableStaff from "./DailyAllowsDetlsTableStaff";
import { useDailyAllows } from "./dailyallows/useDailyAllows";
import { useAddDailyAllows } from "./dailyallows/useAddDailyAllows";
import { useUpdateDailyAllows } from "./dailyallows/useUpdateDailyAllows";
import { useDeleteDailyAllows } from "./dailyallows/useDeleteDailyAllows";
import { useDeleteDailyAllowsDetls } from "./dailyallowsdetls/useDeleteDailyAllowsDetls";
import { useDailyAllowsDetls } from "./dailyallowsdetls/useDailyAllowsDetls";

export default function DailyAllowancesTableStaff() {
  let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const { dailyallows, setFilter } = useDailyAllows();
  const { dailyallowsdetls, setDailyAllowsDetlsId, setDailyAllowsDetlsFilter } =
    useDailyAllowsDetls();
  const addDailyAllows = useAddDailyAllows();
  const updateDailyAllows = useUpdateDailyAllows();
  const deleteDailyAllows = useDeleteDailyAllows();
  const deleteDailyAllowsDetls = useDeleteDailyAllowsDetls();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isAddPeriodDialogOpen, setIsAddPeriodDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [allowsDetlsdata, setAllowsDetlsdata] =
    useRecoilState(allowsDataDetlsState);
  const [allows_period, setAllows_period] = useRecoilState(allowsPeriodState);
  const [allows_empid, setAllows_empid] = useRecoilState(empidState);
  const [allowsdataId, setAllowsdataId] = useState(allowsDataIdState);
  const [toLoad, settoLoad] = useState(true);
  const [error, setError] = useState("");
  const [deletestate, setDeletestate] = useState({
    id: "",
    period: "",
    empid: "",
  });
  const [isAllowsDetlDialogOpen, setIsAllowsDetlDialogOpen] = useState(false);
  const title = `Site Allowances`;
  const {
    loadEmpDailyAllowances,
    loadEmpDailyAllowsDetls,
    dailyallowances_loading,
    dailyallowances_error,
    updateDailyAllowance,
    getSingleBatchDailyAllowsDetl,
  } = useDailyAllowancesContext();

  // useEffect(() => {
  //   loadEmpDailyAllowances(loginLevel.loginUserId);
  // }, [toLoad]);

  // const myCustomSortingAlgorithm = {
  //   ascending: (a, b) => a.period.length - b.period.length,
  //   descending: (a, b) => b.period.length - a.period.length,
  // };

  const columns = [
    {
      title: "Name",
      field: "name",
      editable: "never",
    },
    {
      title: "Period",
      field: "period",
      editable: "never",
    },
    { title: "Location", field: "location", editable: "never" },
    { title: "Manager Name", field: "manager", editable: "never" },
    {
      title: "No Of Days",
      field: "no_of_days",
      type: "numeric",
      editable: "never",
    },
    { title: "Amount", field: "amount", type: "currency", editable: "never" },
    // {
    //   title: "Status",
    //   field: "status",
    //   editComponent: (props) => (
    //     <TextField
    //       //defaultValue={props.value || null}
    //       onChange={(e) => props.onChange(e.target.value)}
    //       style={{ width: 100 }}
    //       value={props.value}
    //       select
    //     >
    //       <MenuItem value="Pending">Pending</MenuItem>
    //       {/* <MenuItem value="Approve">Approve</MenuItem>
    //     <MenuItem value="Reject">Reject</MenuItem>
    //     <MenuItem value="Cancel">Cancel</MenuItem> */}
    //     </TextField>
    //   ),
    // },
  ];

  const Save_DailyAllowancesData = () => {
    dailyallows.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateDailyAllowance({ id, ...fields });
      }
    });
    //handleDialogClose();
  };

  const update_SiteAllowsDetl = (data) => {
    const { id, empid, period, no_of_days, amount } = data;

    loadEmpDailyAllowsDetls(empid, period);

    setAllows_period(period);
    setAllows_empid(empid);
    setAllowsdataId(id);
    setAllows_period(period);
    setAllows_empid(empid);
    setAllowsdataId(id);
    setAllowsdata({
      ...allowsdata,
      id: id,
      no_of_days: no_of_days,
      amount: amount,
      period: period,
      empid: empid,
    });

    //setIsAllowsDetlDialogOpen(true);
    history.push("/singledailyallowsdetlstable");
  };

  const delete_SiteAllows = (data) => {
    const { id, period, empid } = data;
    setDeletestate({ id: id, period: period, empid: empid });
    handleAlertOpen();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = (data) => {
    const { id, period, empid } = deletestate;

    //delete allows detls
    console.log("allowsdetls", dailyallowsdetls);
    dailyallowsdetls
      .filter((f) => f.empid === empid)
      .forEach((rec) => {
        console.log("del", period, empid, rec);
        if (rec.period === period && rec.empid === empid) {
          console.log("del id", rec.id);
          deleteDailyAllowsDetls({ id: rec.id });
        }
      });
    //delete daily allows
    deleteDailyAllows(id);
    // toast({
    //   title: `Site Allowances has been successfully deleted!`,
    //   status: "warning",
    // });
  };

  const add_SiteAllowsPeriod = () => {
    handleAddPeriodDialogOpen();
  };

  const handleAddPeriodDialogOpen = () => {
    setIsAddPeriodDialogOpen(true);
  };

  const handleAddPeriodDialogClose = () => {
    setIsAddPeriodDialogOpen(false);
  };

  const handleAllowsDetlDialogOpen = () => {
    setIsAllowsDetlDialogOpen(true);
  };

  const handleAllowsDetlDialogClose = () => {
    settoLoad(true);
    setIsAllowsDetlDialogOpen(false);
  };

  useEffect(() => {
    setFilter(loginLevel.loginUserId);
    setDailyAllowsDetlsId(loginLevel.loginUserId);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={dailyallows}
          title={title}
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         // const dataUpdate = [...dailyallowances];
          //         // const index = oldData.tableData.id;
          //         // dataUpdate[index] = newData;
          //         //setDailyAllowances([...dataUpdate]);
          //         //approve_Expense(newData);
          //         update_AllowsDetl();
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_SiteAllowsPeriod();
              },
            },
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_SiteAllowsDetl(rowData);
              },
            }),
            // (rowData) => ({
            //   disabled: rowData.status !== "Pending",
            //   icon: "delete",
            //   tooltip: "Delete Record",
            //   onClick: (event, rowData) => {
            //     delete_SiteAllows(rowData);
            //   },
            // }),
          ]}
          options={{
            filtering: true,
            sorting: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />

                <div style={{ padding: "5px 10px" }}>
                  {error && (
                    <Alert severity="error" onClose={() => setError(false)}>
                      Period already existed!
                    </Alert>
                  )}
                </div>
              </div>
            ),
          }}
        />
        <div className={classes.dialog}>
          <CustomDialog
            isOpen={isAddPeriodDialogOpen}
            handleClose={handleAddPeriodDialogClose}
            title=""
            showButton={true}
            isFullscreen={false}
            isFullwidth={false}
          >
            <DailyAllowancesAddPeriod
              handleDialogClose={handleAddPeriodDialogClose}
            />
          </CustomDialog>
        </div>
        <div>
          <CustomDialog
            isOpen={isAllowsDetlDialogOpen}
            handleClose={handleAllowsDetlDialogClose}
            title=""
            showButton={true}
            isFullscreen={false}
            isFullwidth={false}
          >
            <DailyAllowsDetlsTableStaff
              allowsdata={allowsdata}
              allowsdataId={allowsdataId}
              handleDialogClose={handleAllowsDetlDialogClose}
            />
          </CustomDialog>
        </div>
        <div>
          <AlertDialog
            handleClose={handleAlertClose}
            onConfirm={handleOnDeleteConfirm}
            isOpen={isAlertOpen}
            title="Delete Payslip Batch"
          >
            <h2>Are you sure you want to delete ?</h2>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  dialog: {
    width: 1000,
  },
}));
