import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//* Middleware acionado ao salvar um dado no banco de dados

UserSchema.pre('save', function(next) {
  // A próxima função não terá escopo para utilizar o this, logo, é necessário
  // definir agora uma variável para utilizar como this
  const user = this;

  if (!user.isModified('password')) return next();

  // Gera o salt da senha
  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // Gera o hash da senha utilizando o salt
    return bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);

      // Substitui o password sem hash pelo password com hash
      user.password = hash;
      return next();
    });
  });
});

//* Método para checar se a senha está correta
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
