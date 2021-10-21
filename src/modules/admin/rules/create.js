export default {
  firstName: "string",
  lastName: "string",
  username: "alpha_num",
  email: "required|email|unique:admins",
  password: "required|min:8",
};
