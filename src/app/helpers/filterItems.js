export const filterItems = (str, arr) => {
  const findMatch = el => el.substring(0, str.length).toLowerCase() === str.toLowerCase()
  const users = arr.filter(({ username, email }) => findMatch(username) || findMatch(email))

  return users
}
