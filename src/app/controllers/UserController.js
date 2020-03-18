import Users from '../schemas/userSchema';

class UserController {
  async store(req, res) {
    const { email, password } = req.body;

    const isEmailValid = await Users.findOne({ email });

    if (isEmailValid) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const user = await Users.create({
      email,
      password,
    });

    return res.json(user);
  }
}

export default new UserController();
