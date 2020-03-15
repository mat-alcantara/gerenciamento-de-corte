import Cuts from '../schemas/cutSchema';

class CutController {
  async show(req, res) {
    return res.json({ test: 'ok' });
  }

  async store(req, res) {
    const { name, payment, telephone, store, cuts } = req.body;

    const Cut = await Cuts.create({ name, payment, telephone, store, cuts });

    return res.json(Cut);
  }
}

export default new CutController();
