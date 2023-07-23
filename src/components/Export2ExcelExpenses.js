import React from "react";
//import ReactExport from "react-export-excel";
import ReactExport from "react-data-export";
//import { ExcelFile, ExcelSheet } from "react-export-excel";
import { Button } from "@chakra-ui/react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Export2ExcelExpenses = ({ filename, dataset, title, colstype, datatype }) => {
  
  const expensesdata = dataset.map((rec, index) => {
    return [
      {
        value: rec.name ? rec.name : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      {
        value: rec.date ? rec.date : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      
      {
        value: rec.purchased_from ? rec.purchased_from : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      {
        value: rec.description ? rec.description : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      {
        value: rec.amount ? rec.amount : 0,
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      {
        value: rec.status ? rec.status : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      },
      {
        value: rec.remark ? rec.remark : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "top",
          },
        },
      }
     
    ];
  });

  const multiDataSet = [
   
    {
      columns: colstype,
      data: expensesdata,
    },
  ];

  return (
    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet1} name="Organization" />
    // </ExcelFile>

    <ExcelFile
      element={
        <Button colorScheme="teal" variant="solid">
          Download
        </Button>
      }
      filename={filename}
    >
      <ExcelSheet dataSet={multiDataSet} name={title} />
    </ExcelFile>

    // <ExcelFile filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet} name="HOC" />
    // </ExcelFile>

    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet data={dataset} name={title}>
    //     <ExcelColumn label="Name" value="name" />
    //     <ExcelColumn label="From Date" value="from_date" />
    //     <ExcelColumn label="To Date" value="to_date" />
    //     <ExcelColumn label="No of Days" value="no_of_days" />
    //     <ExcelColumn label="Reason" value="reason" />
    //     <ExcelColumn label="Status" value="status" />
    //   </ExcelSheet>
    //</ExcelFile>
  );
};

export default Export2ExcelExpenses;
