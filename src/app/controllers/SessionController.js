import jwt from 'jsonwebtoken';
import Users from '../schemas/userSchema';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const User = await Users.findOne({ email });

    if (!User) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    const id = User._id;

    // Faz a checagem do password
    return User.comparePassword(password, function(err, isMatch) {
      if (err) throw err;

      if (!isMatch) {
        return res.status(400).json({ error: 'Password does not match' });
      }

      return res.json({
        User,
        token: jwt.sign({ id }, auth.secret, {
          expiresIn: auth.expiresIn,
        }),
      });
    });
  }
}

export default new SessionController();
