import clientPromise from "@lib/db";
import User from "@lib/userModel";

export default async function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { firstName, lastName, password, email } = req.body;

        // await clientPromise;
        // const client = await clientPromise;
        // const db = client.db("cloudcast");

        const newUser = await User.create({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
        });
        console.log("made new user");
        res.status(200).json(newUser);
      } catch (err) {
        console.log({ error: err });
      }
    case "GET":
      try {
        const { password, email } = req.body;

        // await clientPromise;
        // const client = await clientPromise;
        // const db = client.db("cloudcast");

        const user = await User.find({
          email: email,
          password: password,
        });

        console.log("found user");
        res.status(200).json(user);
      } catch (err) {
        console.log({ error: err });
      }
    default:
  }

  res.status(200);
}
