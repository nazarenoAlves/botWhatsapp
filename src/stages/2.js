import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

// Mapeamento de filiais para contatos
const filialContacts = {
  1: ['559891204783@c.us','559881946623@c.us','559887363733@c.us'], // SÃO-LUÍS/BR135
  2: ['559891036827@c.us','559887395502@c.us'], // SÃO-LUÍS/POSTO-VALLEN
  3: ['559891841189@c.us','559892231346@c.us'], // CHAPADINHA
  4: ['556593616568@c.us','556596193334@c.us','556599619673@c.us'], // MATO-GROSSO
};

export const stageTwo = {
  async exec(params) {
    const sender = params.from.toString();
    console.log('destination', sender);
    const message = params.message.trim();
    const isMsgValid = /[1|2|3|4|5|#|*]/.test(message);

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️';

    if (isMsgValid) {
      if (['#', '*'].includes(message)) {
        const option = options[message]();
        msg = option.message;
        storage[params.from].stage = option.nextStage;
      } else {
        const filialNumber = parseInt(message);
        if (filialContacts[filialNumber]) {
          // Filial válida, envie a lista de contatos correspondente
          await VenomBot.getInstance().sendContactVcardList(sender, filialContacts[filialNumber]);
          msg =
            `✅ *${menu[message].description}* Selecionada com sucesso! \n\n` +
            '```LISTA COM NÚMERO DE VENDEDORES LOGO ACIMA```: \n\n' +
            '\n-----------------------------------\n#️⃣ - ```FINALIZAR ATENDIMENTO``` \n*️⃣ - VOLTAR';
          // storage[params.from].itens.push(menu[message])
        } else {
          msg = '❌ Filial não encontrada. Por favor, selecione uma opção válida.';
        }
      }

      if (storage[params.from].stage === STAGES.INICIAL) {
        storage[params.from].itens = [];
      }
    }

    if (message !== '#' && message !== '*') {
      await VenomBot.getInstance().sendText({ to: params.from, message: msg });
    }
  },
};

const options = {
  '*': () => {
    return {
      message:'Mande uma mensagem para iniciar um novo atendimento',
      nextStage: STAGES.INICIAL,
    }
  },
  '#': () => {
    const message =
      'ATENDIMENTO FINALIZADO.'

    return {
      message,
      nextStage: STAGES.INICIAL,
    }
  },
}
