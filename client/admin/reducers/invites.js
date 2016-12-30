export default function invites(state = [], action) {
  switch (action.type) {
    case 'SET_INVITES':
      return action.invites;
    default:
      return state;
  }
}
