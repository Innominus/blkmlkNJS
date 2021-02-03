export default async function handler(req, res) {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const { MONGODB_URI } = process.env;
  const db = require("monk")(MONGODB_URI);
  const collection = db.get("customers");

  let today = new Date();
  //today = today.toLocaleString("en", { timeZone: "GMT" });
  const date = today.toLocaleDateString("en-AU", {
    timeZone: "Australia/Sydney",
  });
  const time = today.toLocaleTimeString("en-AU", {
    timeZone: "Australia/Sydney",
  });
  //console.log(JSON.stringify(req.body.data.regInputs, null, 2));
  //
  const regIndex = req.body.data.regInputs.length;
  const regObject = req.body.data.regInputs;
  console.log(regIndex);
  console.log(regObject);
  var postReturnMsg = "";
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
      Date_Of_Register,
      Time_Of_Register,
    });

    console.log(i);
    console.log(Date_Of_Register);
    console.log(Time_Of_Register);
  }
  console.log(today);

  // await collection
  //   .insert(registerArray)
  //   .then((docs) => {
  //     postReturnMsg = registerArray.length + " customer/s inserted \n" + docs;
  //     console.log(docs);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  res.status(200).json({ postReturnMsg });
}
