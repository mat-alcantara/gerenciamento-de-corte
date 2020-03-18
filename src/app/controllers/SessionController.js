import Users from '../schemas/userSchema';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const User = await Users.findOne({ email });

    if (!User) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    // test a matching password
    return User.comparePassword(password, function(err, isMatch) {
      if (err) throw err;

      if (!isMatch) {
        return res.status(400).json({ error: 'Password does not match' });
      }

      return res.json({ message: 'success' });
    });
  }
}

export default new SessionController();
