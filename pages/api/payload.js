const { DateTime } = require("luxon");

export default async function handler(req, res) {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const { MONGODB_URI } = process.env;
  const db = require("monk")(MONGODB_URI);
  const collection = db.get("customers");

  const today = DateTime.fromObject({ zone: "Australia/Sydney" });
  const date = today.toISODate();
  const time = today.toISOTime();

  const regIndex = req.body.data.regInputs.length;
  const regObject = req.body.data.regInputs;
  let postReturnMsg = "";
  let registerArray = [];
  let i;
  for (i = 0; i < regIndex; i++) {
    let { regID, First_Name, Last_Name, Ph_Number } = regObject[i];
    let Date_Of_Register = date;
    let Time_Of_Register = time;

    First_Name = toTitleCase(First_Name.replace(" ", ""));
    Last_Name = toTitleCase(Last_Name.replace(" ", ""));
    Ph_Number = Ph_Number.trim();
    registerArray.push({
      regID,
      First_Name,
      Last_Name,
      Ph_Number,
      Date_Of_Rgister,
      Time_Of_Register,
    });
  }

  await collection
    .insert(registerArray)
    .then((docs) => {
      postReturnMsg = registerArray.length + " customer/s inserted \n" + docs;
      console.log(docs);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  res.status(200).json({ postReturnMsg });
}
