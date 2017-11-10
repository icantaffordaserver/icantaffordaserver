const isUserAdmin = user => {
  if (user.isAdmin) return true
  return false
}

export default isUserAdmin
