import decodeJwt from 'jwt-decode'

const getUserIdFromJwt = userJwt => decodeJwt(userJwt).userId

export default getUserIdFromJwt
