import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from "clsx";
//import dayjs from "dayjs";
import {
  Box,
  Container,
  Divider,
  //Flex,
  //Grid,
  Heading,
  HStack,
  SimpleGrid,
  Select,
  //Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
//import CardLayout from "../helpers/CardLayout";
//import CardLayout2 from "../helpers/CardLayout2";
//import CardLayout4 from "../helpers/CardLayout4";
//import Copyright from "./Copyright";
//import { CustomDialog } from "../helpers/CustomDialog";
//import { useRecoilState } from "recoil";
//import { loginLevelState } from "./data/atomdata";
//import BarChart from "../helpers/BarChart";
//import BarChartStack from "../helpers/BarChartStack";

//import EmployeeTableLeaveView from "./EmployeeTableLeaveView";
//import ExpensesTableViewSummary from "./ExpenseTableViewSummary";
//import ExpenseSummaryTableView from "./ExpensesSummaryTableView";
//import LeavesTableViewSummary from "./LeavesTableViewSummary";
//import HocTableViewSummary from "./HocTableViewSummary";
//import SummaryTableView from "../helpers/SummaryTableView";
//import DailyAllowanceTableViewSummary from "./DailyAllowancesTableViewSummary";
//import PayslipTableViewSummary from "./PayslipTableViewSummary";
//import PayslipSummaryTableView from "./PayslipSummaryTableView";
//import LeavesTableApproval from "./LeaveTableApproval";
//import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
const LeaveTableApproval = React.lazy(() => import("./LeaveTableApproval"));
const EmployeeTableLeaveView = React.lazy(() =>
  import("./EmployeeTableLeaveView")
);
const ExpenseTableViewSummary = React.lazy(() =>
  import("./ExpenseTableViewSummary")
);
const PayslipTableViewSummary = React.lazy(() =>
  import("./PayslipTableViewSummary")
);
const DailyAllowancesTableViewSummary = React.lazy(() =>
  import("./DailyAllowancesTableViewSummary")
);
const HocTableViewSummary = React.lazy(() => import("./HocTableViewSummary"));
const LeavesTableViewSummary = React.lazy(() =>
  import("./LeavesTableViewSummary")
);
const Export2ExcelDialog = React.lazy(() => import("./Export2ExcelDialog"));

const drawerWidth = 240;

//const FILTERSTRING = "Pending";

const initial_expdata = [
  {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  },
];

const HomeManager = () => {
  const classes = useStyles();
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //const { expensesperiod, setExpPeriodId } = useExpensesPeriod();
  //const [expdata, setExpData] = useState(initial_expdata);
   const [selectleaveyear, setSelectLeaveYear] = useState("");
   const [selectexpenseyear, setSelectExpenseYear] = useState("");
   const [selectsiteallowsyear, setSelectSiteAllowsYear] = useState("");
   const [selectpayrollyear, setSelectPayrollYear] = useState("");
   const [selecthocyear, setSelectHocYear] = useState("");
  const currentyear = new Date().getFullYear();
  const currentmonth = new Date().getMonth();

  // const Build_ExpData = () => {
  //   const currentmonth = new Date().getMonth();

  //   for (var i = 1; i <= currentmonth; i++) {
  //     expdata[i] = i;
  //   }
  //   console.log("date", currentyear, currentmonth, expdata);
  // };

  // useEffect(() => {
  //   Build_ExpData();
  // }, []);

   useEffect(() => {
     setSelectLeaveYear(currentyear);
     setSelectExpenseYear(currentyear);
     setSelectSiteAllowsYear(currentyear);
     setSelectPayrollYear(currentyear);
     setSelectHocYear(currentyear);
   }, []);
  
  return (
    // <div>
    //   <div className={classes.appBarSpacer} />
    //   <div style={{ paddingLeft: 50 }}>
    //     <h2>Welcome {loginLevel.loginUser}!</h2>
    //     <h3>Dashboard</h3>
    //   </div>
    <Container maxW="full" mt="100">
      <Box
        //minW="100%"
        padding="4"
        width="full"
        height="800"
        borderColor="blue.500"
        borderWidth="1px"
        borderRadius="lg"
        //overflow="scroll"
      >
        <Tabs>
          <TabList>
            <Tab>Employees</Tab>
            <Tab>Leaves</Tab>
            <Tab>Expenses</Tab>
            <Tab>Site Allowances</Tab>
            <Tab>Payroll</Tab>
            <Tab>HOC History</Tab>
            <Tab>Leaves Approval</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box
                maxW="full"
                padding="4"
                width="100%"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid>
                  <Box>
                    <Heading as="h2" size="lg">
                      Employees
                    </Heading>
                  </Box>
                  <Divider />
                  <Box>
                    <Tabs isLazy>
                      {/* <TabList>
                        <Tab>Details</Tab>
                      </TabList> */}
                      <TabPanels>
                        <TabPanel>
                          <EmployeeTableLeaveView />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="100%"
                padding="4"
                width="full"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid w="168vh">
                  <HStack>
                    <Box>
                      <Heading as="h2" size="lg">
                        Leaves
                      </Heading>
                    </Box>
                    <Box alignSelf="flex-end">
                      <HStack>
                        <Select
                          value={selectleaveyear}
                          fontSize={20}
                          onChange={(e) => setSelectLeaveYear(e.target.value)}
                        >
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </Select>
                        {/* <Box size="xl" py={2}>
                          <Text fontSize="lg">
                            <ExportLeave2Excel
                              filename="leave"
                              dataset={dataset}
                              title="Leave"
                            />
                          </Text>
                        </Box> */}
                      </HStack>
                    </Box>
                  </HStack>
                  <Divider />
                  <Box>
                    <Tabs defaultIndex={currentmonth} isLazy>
                      <TabList>
                        {/* <Tab>Chart</Tab>
                          <Tab>Summary</Tab> */}
                        <Tab>January</Tab>
                        <Tab>February</Tab>
                        <Tab>March</Tab>
                        <Tab>April</Tab>
                        <Tab>May</Tab>
                        <Tab>June</Tab>
                        <Tab>July</Tab>
                        <Tab>August</Tab>
                        <Tab>September</Tab>
                        <Tab>October</Tab>
                        <Tab>November</Tab>
                        <Tab>December</Tab>
                      </TabList>
                      <TabPanels>
                        {/* <TabPanel>
                  <BarChart
                    heading="Expenses for the Month"
                    barchartdata={expchartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <SummaryTableView columns={columns} data={data} />
                </TabPanel> */}
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={1}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={2}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={3}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={4}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={5}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={6}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={7}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={8}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={9}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={10}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={11}
                          />
                        </TabPanel>
                        <TabPanel>
                          <LeavesTableViewSummary
                            year={
                              selectleaveyear ? selectleaveyear : currentyear
                            }
                            month={12}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="x3"
                padding="4"
                width="100%"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid w="168vh">
                  <HStack>
                    <Box>
                      <Heading as="h2" size="lg">
                        Expenses Claims
                      </Heading>
                    </Box>
                    <Box alignSelf="flex-end">
                      <HStack>
                        <Select
                          value={selectexpenseyear}
                          fontSize={20}
                          onChange={(e) => setSelectExpenseYear(e.target.value)}
                        >
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </Select>
                        {/* <Box size="xl" py={2}>
                          <Text fontSize="lg">
                            <ExportLeave2Excel
                              filename="leave"
                              dataset={dataset}
                              title="Leave"
                            />
                          </Text>
                        </Box> */}
                      </HStack>
                    </Box>
                  </HStack>
                  <Divider />
                  <Box>
                    <Tabs defaultIndex={currentmonth} isLazy>
                      <TabList>
                        {/* <Tab>Chart</Tab>
                          <Tab>Summary</Tab> */}
                        <Tab>January</Tab>
                        <Tab>February</Tab>
                        <Tab>March</Tab>
                        <Tab>April</Tab>
                        <Tab>May</Tab>
                        <Tab>June</Tab>
                        <Tab>July</Tab>
                        <Tab>August</Tab>
                        <Tab>September</Tab>
                        <Tab>October</Tab>
                        <Tab>November</Tab>
                        <Tab>December</Tab>
                      </TabList>
                      <TabPanels>
                        {/* <TabPanel>
                  <BarChart
                    heading="Expenses for the Month"
                    barchartdata={expchartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <ExpenseSummaryTableView year={currentyear} />
                </TabPanel> */}
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={1}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={2}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={3}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={4}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={5}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={6}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={7}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={8}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={9}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={10}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={11}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ExpenseTableViewSummary
                            year={
                              selectexpenseyear
                                ? selectexpenseyear
                                : currentyear
                            }
                            month={12}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="x3"
                padding="4"
                width="100%"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid w="168vh">
                  <HStack>
                    <Box>
                      <Heading as="h2" size="lg">
                        Site Allowances
                      </Heading>
                    </Box>
                    <Box alignSelf="flex-end">
                      <HStack>
                        <Select
                          value={selectsiteallowsyear}
                          fontSize={20}
                          onChange={(e) =>
                            setSelectSiteAllowsYear(e.target.value)
                          }
                        >
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </Select>
                        {/* <Box size="xl" py={2}>
                          <Text fontSize="lg">
                            <ExportLeave2Excel
                              filename="leave"
                              dataset={dataset}
                              title="Leave"
                            />
                          </Text>
                        </Box> */}
                      </HStack>
                    </Box>
                  </HStack>
                  <Divider />
                  <Box>
                    <Tabs defaultIndex={currentmonth} isLazy>
                      <TabList>
                        {/* <Tab>Chart</Tab>
                <Tab>Summary</Tab> */}
                        <Tab>January</Tab>
                        <Tab>February</Tab>
                        <Tab>March</Tab>
                        <Tab>April</Tab>
                        <Tab>May</Tab>
                        <Tab>June</Tab>
                        <Tab>July</Tab>
                        <Tab>August</Tab>
                        <Tab>September</Tab>
                        <Tab>October</Tab>
                        <Tab>November</Tab>
                        <Tab>December</Tab>
                      </TabList>
                      <TabPanels>
                        {/* <TabPanel>
                  <BarChart
                    heading="Site Allowances for the Month"
                    barchartdata={paychartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <SummaryTableView columns={columns} data={data} />
                </TabPanel> */}
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="01"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="02"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="03"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="04"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="05"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="06"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="07"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="08"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="09"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="10"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="11"
                          />
                        </TabPanel>
                        <TabPanel>
                          <DailyAllowancesTableViewSummary
                            year={
                              selectsiteallowsyear
                                ? selectsiteallowsyear
                                : currentyear
                            }
                            month="12"
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="x3"
                padding="4"
                width="100%"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid>
                  <Box>
                    <Heading as="h2" size="lg">
                      Payroll
                    </Heading>
                  </Box>
                  <Divider />
                  <Box>
                    <Tabs isLazy>
                      <TabList>
                        {/* <Tab>Chart</Tab>
                <Tab>Summary</Tab> */}
                        <Tab>Approved</Tab>
                        <Tab>Verified</Tab>
                        <Tab>Pending</Tab>
                        <Tab>Rejected</Tab>
                      </TabList>
                      <TabPanels>
                        {/* <TabPanel>
                  <BarChart
                    heading="Payroll for the Month"
                    barchartdata={paychartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <PayslipSummaryTableView year={currentyear} status="Approved" />
                </TabPanel> */}
                        <TabPanel>
                          <PayslipTableViewSummary status="Approved" />
                        </TabPanel>
                        <TabPanel>
                          <PayslipTableViewSummary status="Verified" />
                        </TabPanel>
                        <TabPanel>
                          <PayslipTableViewSummary status="Pending" />
                        </TabPanel>
                        <TabPanel>
                          <PayslipTableViewSummary status="Rejected" />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="100%"
                padding="4"
                width="full"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <SimpleGrid w="168vh">
                  <HStack>
                    <Box>
                      <Heading as="h2" size="lg">
                        HOC History
                      </Heading>
                    </Box>
                    <Box alignSelf="flex-end">
                      <HStack>
                        <Select
                          value={selecthocyear}
                          fontSize={20}
                          onChange={(e) => setSelectHocYear(e.target.value)}
                        >
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </Select>
                        {/* <Box size="xl" py={2}>
                          <Text fontSize="lg">
                            <ExportLeave2Excel
                              filename="leave"
                              dataset={dataset}
                              title="Leave"
                            />
                          </Text>
                        </Box> */}
                      </HStack>
                    </Box>
                  </HStack>
                  <Divider />
                  <Box>
                    <Tabs defaultIndex={currentmonth} isLazy>
                      <TabList>
                        {/* <Tab>Chart</Tab>
                          <Tab>Summary</Tab> */}
                        <Tab>January</Tab>
                        <Tab>February</Tab>
                        <Tab>March</Tab>
                        <Tab>April</Tab>
                        <Tab>May</Tab>
                        <Tab>June</Tab>
                        <Tab>July</Tab>
                        <Tab>August</Tab>
                        <Tab>September</Tab>
                        <Tab>October</Tab>
                        <Tab>November</Tab>
                        <Tab>December</Tab>
                      </TabList>
                      <TabPanels>
                        {/* <TabPanel>
                  <BarChart
                    heading="Expenses for the Month"
                    barchartdata={expchartdata}
                  />
                </TabPanel>
                <TabPanel>
                  <SummaryTableView columns={columns} data={data} />
                </TabPanel> */}
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={1}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={2}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={3}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={4}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={5}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={6}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={7}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={8}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={9}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={10}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={11}
                          />
                        </TabPanel>
                        <TabPanel>
                          <HocTableViewSummary
                            year={selecthocyear ? selecthocyear : currentyear}
                            month={12}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Divider />
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="full"
                padding="4"
                width="100%"
                height="700"
                borderColor="blue.500"
                borderWidth="1px"
                borderRadius="lg"
                overflow="scroll"
              >
                <LeaveTableApproval />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    // </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default HomeManager;
