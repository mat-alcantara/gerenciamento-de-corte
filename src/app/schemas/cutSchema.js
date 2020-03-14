const mongoose = require('mongoose');

const { Schema } = mongoose;

const cutSchema = new Schema({
  // TODO: Implementar a sequencia de cortes
  // TODO: Implementar o sistema de datas
  // TODO: Implementar o sistema de IDs
  name: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    enum: ['pago', 'parcialmente pago', 'receber na entrega'],
    required: true,
  },
  telephone: Number,
  store: {
    type: String,
    required: true,
    enum: ['frade', 'japuiba'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // delivery_date: {
  //   type: Date,
  // },
  // cuts: String,
});

export default mongoose.model('Cuts', cutSchema);

/*
- Cliente
- Status de pagamento
- Codigo do Pedido
- Telefone do cliente
- Loja de emissão do pedido
- Data do pedido
- Data de Entrega
- Listagem de peças:
- Quantidade {
  - Lado 1
  - Lado 2
  - Fita 1
  - Fita 2
  - Material
    }
*/
