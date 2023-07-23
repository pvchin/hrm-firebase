const { table } = require("./airtable-leaves");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi, fid, m, y, al } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const leave = await table.find(id);
    const formattedLeaves = { id: leave.id, ...leave.fields };
    if (leave.error) {
      return {
        statusCode: 404,
        body: `No Leave with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedLeaves);
  }

  if (fv) {
    const leaves = await table
      .select({
        view: "sortedview",
        //filterByFormula: `empid = '${fv}'`
        filterByFormula: `AND(empid='${fv}',YEAR(from_date)='${y}')`,
      })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  if (fid) {
    const leaves = await table
      .select({
        view: "sortedview",
        //filterByFormula: `empid = '${fv}'`
        filterByFormula: `empid='${fid}'`,
      })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  if (fi) {
    const leaves = await table
      .select({ view: "sortedview", filterByFormula: `status = '${fi}'` })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  if (m) {
    const leaves = await table
      .select({
        view: "leavesview",
        filterByFormula: `AND(MONTH(from_date)=${m},YEAR(from_date)=${y})`,
      })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  if (al) {
<<<<<<< HEAD
    /*  const leaves = await table
=======
    //const leaves = await table
    let recordsArray = [];
    await table
>>>>>>> 5fb457ee39b1a3391e39c68ad7528024e273d507
      .select({
        maxRecords: 10000,
        view: "leavesview",
        filterByFormula: `YEAR(from_date) = '${al}'`,
      })
<<<<<<< HEAD
      .firstPage(); */
    let recordsArray = [];
    await table
      .select({
        maxRecords: 10000,
        view: "leavesview",
        filterByFormula: `YEAR(from_date) = '${al}'`,
      })
=======
>>>>>>> 5fb457ee39b1a3391e39c68ad7528024e273d507
      .eachPage((records, fetchNewPage) => {
        recordsArray = [...recordsArray, ...records];

        fetchNewPage();
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    const formattedLeaves = recordsArray.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  try {
    //const leaves = await table.select({ view: "sortedview" }).firstPage();
<<<<<<< HEAD

=======
>>>>>>> 5fb457ee39b1a3391e39c68ad7528024e273d507
    let recordsArray = [];
    await table
      .select({
        maxRecords: 10000,
        view: "sortedview",
      })
      .eachPage((records, fetchNewPage) => {
        recordsArray = [...recordsArray, ...records];

        fetchNewPage();
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
<<<<<<< HEAD
=======

>>>>>>> 5fb457ee39b1a3391e39c68ad7528024e273d507
    const formattedLeaves = recordsArray.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
