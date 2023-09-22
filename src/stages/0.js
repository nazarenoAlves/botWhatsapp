import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `
      👋 Olá, como vai?
      Eu sou Alex, o *assistente virtual* da ${venombot.getSessionName}.
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - GOSTARIA DE FALAR COM UM VENDEDOR
      2️⃣ - QUERO COMPRAR DIRETAMENTE NO WHATSAPP
      0️⃣ - FINALIZAR
    `
    await venombot.sendText({ to: from, message })
  },
}
