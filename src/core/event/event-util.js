import { LOGIN_SUCCESS, LOGIN_EXPIRE, LOGOUT } from './event-key'
import Bus from './index'

function emitLoginSuccess(data) {
  Bus.$emit(LOGIN_SUCCESS, data)
}

function emitLoginExpireMsg() {
  Bus.$emit(LOGIN_EXPIRE)
}

function emitLogout() {
  Bus.$emit(LOGOUT)
}

export { emitLoginSuccess, emitLoginExpireMsg, emitLogout }
