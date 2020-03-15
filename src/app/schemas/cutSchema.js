import cutDetailsSchema from './cutDetailsSchema';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const cutSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['produçao', 'liberado para transporte', 'entregue'],
    },
    name: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ['pago', 'parcialmente pago', 'receber na entrega', 'orçamento'],
      required: true,
    },
    telephone: Number,
    store: {
      type: String,
      required: true,
      enum: ['frade', 'japuiba'],
    },
    // date: {
    //   type: Date, // 2002-12-09T00:00:00.000Z
    //   default: Date.now,
    // },
    // deliveryDate: {
    //   type: Date,
    //   required: true,
    // },
    /*
    Utiliza um Schema diferente para detalhar cada peça do corte, 
    além da possibilidade de adicionar várias peças diferentes em um array
  */
    cuts: [cutDetailsSchema],
    ps: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

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
