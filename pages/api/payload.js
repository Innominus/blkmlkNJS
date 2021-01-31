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
  let i;
  for (i = 0; i < regIndex; i++) {
    const { regID, First_Name, Last_Name, Ph_Number } = regObject[i];
    const Date_Of_Register = date;
    const Time_Of_Register = time;

    db.collection("customers").insertOne(
      {
        regID,
        First_Name,
        Last_Name,
        Ph_Number,
        Date_Of_Register,
        Time_Of_Register,
      },
      (err, res) => {
        if (err) throw err;
        console.log(" 1 customer inserted");
      }
    );
  }
  res.status(200).json({ message: "Hello" });
}
