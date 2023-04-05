import dbConnect from '@lib/db';
import User from '@model/userModel';
import bcrypt from 'bcrypt';

export default async function userHandler(req, res) {
  const { firstName, lastName, password, email } = req.body;

  await dbConnect();

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      password: passwordHash,
      email: email,
    });

    console.log('made new user');
    return res.json(newUser);
  } catch (err) {
    console.log({ error: err });
  }
}
