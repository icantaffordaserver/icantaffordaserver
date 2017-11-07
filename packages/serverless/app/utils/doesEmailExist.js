import getUserByEmail from './getUserByEmail'

const doesEmailExist = async email => {
  const user = await getUserByEmail(email)

  if (!user) return false
  return true
}

export default doesEmailExist
