import React from "react";
import ReactExport from "react-data-export";
//import { ExcelFile, ExcelSheet } from "react-export-excel";
import { Button } from "@chakra-ui/react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const cols = [
  { title: "Findings", width: { wch: 100 } },
 
];


const cols1 = [
  { title: "Name", width: { wch: 50 } },
  { title: "From Date", width: { wch: 10 } },
  { title: "To Date", width: { wch: 10 } },
  { title: "No of Days", width: { wch: 10 } },
  { title: "Reason", width: { wch: 50 } },
  { title: "Status", width: { wch: 50 } },
];

const cols2 = [
  { title: "Name" },
  { title: "From Date" },
  { title: "To Date" },
  { title: "No of Days" },
  { title: "Reason" },
  { title: "Status" },
];

const data = [
  [
    { value: "H1", style: { font: { sz: "24", bold: true } } },
    { value: "Bold", style: { font: { bold: true } } },
    {
      value: "Red",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
      },
    },
  ],
  [
    { value: "H2", style: { font: { sz: "18", bold: true } } },
    { value: "underline", style: { font: { underline: true } } },
    {
      value: "Blue",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
      },
    },
  ],
  [
    { value: "H3", style: { font: { sz: "14", bold: true } } },
    { value: "italic", style: { font: { italic: true } } },
    {
      value: "Green",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
      },
    },
  ],
  [
    { value: "H4", style: { font: { sz: "12", bold: true } } },
    { value: "strike", style: { font: { strike: true } } },
    {
      value: "Orange",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
      },
    },
  ],
  [
    { value: "H5", style: { font: { sz: "10.5", bold: true } } },
    { value: "outline", style: { font: { outline: true } } },
    {
      value: "Yellow",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
      },
    },
  ],
  [
    { value: "H6", style: { font: { sz: "7.5", bold: true } } },
    { value: "shadow", style: { font: { shadow: true } } },
    {
      value: "Light Blue",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
  ],
];

const data1 = [
  [
    {
      value: "Johson Michael Angelo",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-04",
      style: {
        font: { sz: "12" },
        numFmt: "dd/mm/yyyy",
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-04",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: 3,
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Holiday",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Approved",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
  ],
  [
    {
      value: "David",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-11",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-14",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: 3,
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Holiday",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Approved",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
  ],
];

const multiDataSet = [
  {
    columns: cols,
    data: data1,
  },
];

const multiDataSet1 = [
  {
    columns: [
      { value: "Name", widthPx: 50 }, // width in pixels
      { value: "Salary", widthCh: 20 }, // width in charachters
      { value: "Sex", widthPx: 60, widthCh: 20 }, // will check for width in pixels first
    ],
    data: [
      ["Johnson", 30000, "Male"],
      ["Monika", 355000, "Female"],
      ["Konstantina", 20000, "Female"],
      ["John", 250000, "Male"],
      ["Josef", 450500, "Male"],
    ],
  },
  {
    xSteps: 1, // Will start putting cell with 1 empty cell on left most
    ySteps: 5, //will put space of 5 rows,
    columns: ["Name", "Department"],
    data: [
      ["Johnson", "Finance"],
      ["Monika", "IT"],
      ["Konstantina", "IT Billing"],
      ["John", "HR"],
      ["Josef", "Testing"],
    ],
  },
];

const ExportHoc2Excel = ({ filename, dataset, title }) => {
  return (
    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet1} name="Organization" />
    // </ExcelFile>

    <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
      <ExcelSheet dataSet={multiDataSet} name="Leave" />
    </ExcelFile>

    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet data={dataset} name={title}>
    //     <ExcelColumn label="Findings" value="findings" widthPx={100} />
    //     <ExcelColumn label="Risks" value="risks" />
    //     <ExcelColumn label="Type/Category" value="category" />
    //     <ExcelColumn label="What" value="what" />
    //     <ExcelColumn label="What Details" value="what_details" />
    //     <ExcelColumn label="Why" value="why" />
    //     <ExcelColumn label="Why Details" value="why_details" />
    //     <ExcelColumn label="Discussion" value="discussion" />
    //     <ExcelColumn label="Action" value="action" />
    //     <ExcelColumn label="Follow-up Required?" value="isfollowup" />
    //     <ExcelColumn label="Work Related?" value="isworkrelated" />
    //     <ExcelColumn label="Raised By" value="raisedby" />
    //     <ExcelColumn label="Raised On" value="raisedon" />
    //     <ExcelColumn label="Location" value="location" />
    //   </ExcelSheet>
    // </ExcelFile>
  );
};

export default ExportHoc2Excel;
