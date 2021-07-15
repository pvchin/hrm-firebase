import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTable } from "react-table";
import axios from "axios";
import clsx from "clsx";
import Table from "../helpers/TableContainer";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 240;

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = useMemo(() => [
    {
      Header: "TV Show",
      columns: [
        {
          Header: "Name",
          accessor: "show.name",
        },
        {
          Header: "Language",
          accessor: "show.language",
        },
        {
          Header: "Official Site",
          accessor: "show.officialSite",
          Cell: ({ cell: { value } }) =>
            value ? <a href={value}>{value}</a> : "-",
        },
        {
          Header: "Status",
          accessor: "show.status",
        },
        {
          Header: "Premiered",
          accessor: "show.premiered",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Time",
          accessor: "show.schedule.time",
          Cell: ({ cell: { value } }) => value || "-",
        },
      ],
    },
  ]);

  return (
    <paper className={fixedHeightPaper} style={{ backgroundColor: "white" }}>
      <section className={classes.section}>
        <div className="App">
          <h1>
            <center>React Table Demo</center>
          </h1>
          <Table columns={columns} data={data} />
        </div>
      </section>
    </paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "primary",
  },
  fixedHeight: {
    height: 800,
  },
  paper: {
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  section: {
    width: "90vw",
    margin: "5rem auto",
    maxWidth: "var(--max-width)",
  },
  underline: {
    width: "5rem",
    height: "0.25rem",
    marginBottom: "1.25rem",
    background: "var(--clr-primary-5)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginbottom: "4rem",
    textAlign: "center",
  },
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    letterSpacing: "var(--spacing)",
    margin: "0 0.5rem",
    transition: "var(--transition)",
    cursor: "pointer",
    padding: "0.25rem 0",
    lineHeight: "1",
    outlineColor: "var(--clr-primary-10)",
    "&:hover": {
      color: "var(--clr-primary-5)",
      boxShadow: "0 2px var(--clr-primary-5)",
    },
  },
  activebtn: {
    color: "var(--clr-primary-5)",  
    boxShadow: "0 2px var(--clr-primary-5)",
  },
  jobinfo: {
    fontWeight: "400",
  },
  
}));

export default Example;
