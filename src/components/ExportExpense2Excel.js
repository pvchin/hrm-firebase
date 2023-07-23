import React, { useEffect } from "react";
//import ReactExport from "react-export-excel";
import ReactExport from "react-data-export";
//import { ExcelFile, ExcelSheet } from "react-export-excel";
import { Button } from "@chakra-ui/react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExpense2Excel = ({ filename, dataset, title }) => {
  const cols = [
    {
      title: "Name",
      width: { wch: 50 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        alignment: {
          wrapText: true,
          horizontal: "left",
          vertical: "top",
        },
      },
    },
    {
      title: "Purchased Date",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },

    {
      title: "Purchased From",
      width: { wch: 40 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "left",
          vertical: "top",
        },
      },
    },
    {
      title: "Description",
      width: { wch: 40 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "left",
          vertical: "top",
        },
      },
    },
    {
      title: "Amount",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "right",
          vertical: "top",
        },
      },
    },
    {
      title: "Remark",
      width: { wch: 40 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "left",
          vertical: "top",
        },
      },
    },
    {
      title: "Status",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "left",
          vertical: "top",
        },
      },
    },
  ];

  const data = dataset.map((rec, index) => {
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
            horizontal: "center",
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
        value: rec.amount ? rec.amount : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "right",
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
    ];
  });

  const multiDataSet = [
    // {
    //   columns: cols1,
    //   data: [],
    // },
    {
      columns: cols,
      data: data,
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
export default ExportExpense2Excel;
