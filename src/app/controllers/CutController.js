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
      status: Yup.string()
        .oneOf(['produçao', 'liberado para transporte', 'entregue'])
        .required(),
      // deliveryDate: Yup.date().required(),
    });

    // Armazena as constantes do req.body referentes aos dados a serem armazenados
    // no banco de dados
    const {
      code,
      status,
      name,
      payment,
      telephone,
      store,
      cuts,
      ps,
    } = req.body;

    // TODO: Implementar um sistema de data de entrega
    // const deliveryDate = new Date();

    // Confere se os dados estão válidos de acordo com o schema do Yup
    if (
      !(await schema.isValid({
        code,
        status,
        name,
        payment,
        telephone,
        store,
        cuts,
      }))
    ) {
      // Retorna um erro caso os dados não sejam validados
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Armazena os dados no banco de dados
    const Cut = await Cuts.create({
      code,
      status,
      name,
      payment,
      telephone,
      store,
      cuts,
      ps,
    });

    // Retorna um JSON com os dados armazenados no banco de dados
    return res.json(Cut);
  }
}

export default new CutController();
