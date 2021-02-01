//import { connectToDatabase } from "../../my-mongodb-api/mongodb";

export default async function handler(req, res) {
  //const { db } = await connectToDatabase();
  const { MONGODB_URI } = process.env;
  const db = require("monk")(MONGODB_URI);
  const collection = db.get("customers");

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
    registerArray.push({
      regID,
      First_Name,
      Last_Name,
      Ph_Number,
      Date_Of_Register,
      Time_Of_Register,
    });

    console.log(i);
  }
  await collection
    .insert(registerArray)
    .then((docs) => {
      postReturnMsg = registerArray.length + " customer/s inserted \n" + docs;
      console.log(docs);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({ postReturnMsg });
}
