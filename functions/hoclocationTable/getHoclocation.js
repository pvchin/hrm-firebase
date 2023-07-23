const { table } = require("./airtable-hoclocation");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoclocation = await table.find(id);
    const formattedHoclocation = { id: hoclocation.id, ...hoclocation.fields };
    if (hoclocation.error) {
      return {
        statusCode: 404,
        body: `No HOC Location with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoclocation);
  }
  
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      let recordsArray = []
      await table
      .select({
        maxRecords: 10000,
        view: "sortedview"
        
      })
      .eachPage((records, fetchNewPage) => {
        recordsArray = [...recordsArray, ...records];

        fetchNewPage();
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    //console.log('all', recordsArray)
    const formattedHoc = recordsArray.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedHoc);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    let records = [];

    // called for every page of records
    const processPage = (partialRecords, fetchNextPage) => {
      //console.log("partial", partialRecords)
      records = [...records, ...partialRecords];
      fetchNextPage();
    };
    // called when all the records have been retrieved
    const processRecords = (err) => {
      if (err) {
        console.error(err);
        return;
      }
    };

    table
      .select({
        view: "sortedview",
        pageSize: 24,
      })
      .eachPage(processPage, processRecords);
    //console.log("loc", records)
    // const formattedHoclocation = records.map((e) => ({
    //   id: e.id,
    //   ...e.fields,
    // }));
    // console.log("loc", records)
    // return formattedReturn(200, formattedHoclocation);
    return formattedReturn(200, records);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
