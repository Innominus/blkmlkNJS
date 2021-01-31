import { connectToDatabase } from "../../my-mongodb-api/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

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
  db.collection("customers").insertMany(registerArray, (err, res) => {
    if (err) throw err;

    console.log(registerArray.length + " customer/s inserted");
  });
  res.status(200).json({ message: "Hello" });
}
