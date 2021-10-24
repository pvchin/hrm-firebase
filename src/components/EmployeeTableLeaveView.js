import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { useHistory} from "react-router-dom"
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GrFormView } from "react-icons/gr";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialogBox";
import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useEmployeesContext } from "../context/employees_context";
import { useEmployees } from "./employees/useEmployees";

const columns = [
  {
    title: "Name",
    field: "name",
    cellStyle: {
      width: 200,
      maxWidth: 200,
    },
  },
  { title: "IC No", field: "ic_no" },
  { title: "Gender", field: "gender" },
  { title: "Designation", field: "designation" },
  { title: "Department", field: "department" },
  { title: "Leave Entitled", field: "leave_entitled", type: "numeric" },
  { title: "Leave Balance", field: "leave_bal", type: "numeric" },
  // { title: "Email", field: "email" },
];

export default function EmployeeTableLeaveView({ year }) {
  const classes = useStyles();
  const history = useHistory()
  const { employees, setEmployeeId } = useEmployees();
  const [expdata, setExpData] = useState([]);
  const { expensesperiod, setExpPeriodYrId, setExpPeriodMthId } =
    useExpensesPeriod();
 
  const {
    editEmployeeID,
    employees_loading,
    //deleteEmployee,
    //loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
    //getSingleEmployee,
  } = useEmployeesContext();
  
  const update_Employee = (data) => {
     const { id } = data;
     resetSingleEmployee();
     resetEmployees();
     setEditEmployeeID(id);
     setIsEditingOn();
     setEmployeeId(id);

     history.push("/singleemployee");
  }
  

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={employees.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          )}
          title="Expenses Claims"
          actions={[
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <GrFormView size="33px" />,
              tooltip: "View",
              onClick: (event, rowData) => {
                update_Employee(rowData)
              },
            }),
          ]}
          options={{
            filtering: true,
            search: true,
            toolbar: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
