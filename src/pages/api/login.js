import dbConnect from '@lib/db';
import User from '@model/userModel';
import bcrypt from 'bcrypt';

export default async function userHandler(req, res) {
  const { password, email } = req.body;

  await dbConnect();

  try {
    const user = await User.findOne({
      email: email,
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    console.log('found user');
    
    delete user.password;
    return res.json(user);
  } catch (err) {
    console.log({ error: err });
  }
}
