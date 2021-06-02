import { reactive, readonly, inject, App } from 'vue'
import { TestingType } from '../types/shared'

interface State {
  testingType: TestingType | undefined
}

function createInitialState (): State {
  return {
    testingType: undefined,
  }
}

const storeKey = Symbol('store')

class Store {
  private state: State

  install (app: App) {
    app.provide(storeKey, this)
  }

  constructor (initialState: State) {
    this.state = reactive(initialState)
  }

  getState () {
    return readonly(this.state)
  }

  setTestingType (testingType: TestingType) {
    this.state.testingType = testingType
  }
}

// useful for testing
export function createStore () {
  return new Store(createInitialState())
}

export const store = new Store(createInitialState())

export const useStore = (): Store => {
  const _store = inject<Store>(storeKey)

  if (!_store) {
    throw Error('`store` not found. Did you forget to do `app.use(store)`?')
  }

  return _store
}
