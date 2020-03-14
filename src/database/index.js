const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/caverna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
