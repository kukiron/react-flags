export const validateForm = ({ email, password, username }) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return "Invalid email address"
  else if (password.length < 8) return "Password must be 8 characters long"
  else if (!/^[a-zA-Z0-9 ]+$/.test(username)) return "Use only letters & numbers for username"
}
