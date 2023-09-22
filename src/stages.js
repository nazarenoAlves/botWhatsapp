import {
  initialStage,
  stageOne,
  stageTwo,
  finalStage,
} from './stages/index.js'

import { storage } from './storage.js'

export const stages = [
  {
    descricao: 'Welcome',
    stage: initialStage,
  },
  {
    descricao: 'Menu',
    stage: stageOne,
  },
  {
    descricao: 'Address',
    stage: stageTwo,
  },
  {
    descricao: 'Assistent',
    stage: finalStage,
  },
]

export function getStage({ from }) {
  if (storage[from]) {
    return storage[from].stage
  }

  storage[from] = {
    stage: 0,
    itens: [],
    address: '',
  }

  return storage[from].stage
}
