const { table } = require("./airtable-hoc");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHoc = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHoc);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
