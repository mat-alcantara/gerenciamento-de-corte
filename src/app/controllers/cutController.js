import * as Yup from 'yup';
import Cuts from '../schemas/cutSchema';

class CutController {
  async show(req, res) {
    return res.json({ test: 'ok' });
  }

  async store(req, res) {
    /*
      Os dados serão validados com o Yup conforme as regras do Schema do mongoose,
      e logo em seguida serão conferidos antes da tentativa de armazenar no banco
      de dados
    */
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      name: Yup.string().required(),
      payment: Yup.string()
        .oneOf(['pago', 'parcialmente pago', 'receber na entrega', 'orçamento'])
        .required(),
      telephone: Yup.number(),
      store: Yup.string()
        .oneOf(['frade', 'japuiba'])
        .required(),
      cuts: Yup.array().required(),
    });

    const { code, name, payment, telephone, store, cuts } = req.body;

    if (
      !(await schema.isValid({ code, name, payment, telephone, store, cuts }))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Armazena os dados no banco de dados
    const Cut = await Cuts.create({
      code,
      name,
      payment,
      telephone,
      store,
      cuts,
    });

    return res.json(Cut);
  }
}

export default new CutController();
