import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { storage } from '../storage.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[0|1|2]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params)
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  },
}

const options = {
  1: () => {
    let message = '🚨  ESCOLHA FILIAL  🚨\n\n'

    Object.keys(menu).forEach((value) => {
      message += `${numbers[value]} - _${menu[value].description}_ \n`
    })

    return {
      message,
      nextStage: STAGES.FILIAL,
    }
  },
  0: () => {
    let message = 'ATENDIMENTO FINALIZADO'

    // Object.keys(menu).forEach((value) => {
    //   message += `${numbers[value]} - _${menu[value].description}_ \n`
    // })

    return {
      message,
      nextStage: STAGES.INICIAL,
    }
  }
}

const numbers = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
}
