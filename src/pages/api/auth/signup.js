import dbConnection from "../../../../database/conn";
import UserScm from "../../../../database/schema";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  dbConnection().catch(() => res.status(405).json("Database connecton error"));

  // only post mecthod accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Data not found" });
    const { name, email, password } = req.body;

    //Check if user already exists
    const userExist = await UserScm.findOne({ email });
    if (userExist)
      return res.status(422).json({ message: "User already exists" });
    UserScm.create(
      { name, email, password: await hash(password, 12) },
      function (error, data) {
        if (error) return res.status(405).json(error);
        res.status(200).json({ status: true, userData: data });
      }
    );
  } else {
    res.status(500).json({ message: "Request not valid" });
  }
}
