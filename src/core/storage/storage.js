import engine from 'store/src/store-engine'
import sstorage from 'store/storages/sessionStorage'
import lstorage from 'store/storages/localStorage'

export const ls = engine.createStore([lstorage])
export const ss = engine.createStore([sstorage])
