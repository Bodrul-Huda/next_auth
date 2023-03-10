const loginValidate = (values) => {
  const errors = {};
  // validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password must be 8 to 20 character long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  return errors;
};

export default loginValidate;

// Validation for Register Form

export function registerValidate(values) {
  const errors = {};
  // validation user name
  if (!values.name) {
    errors.name = "User Name Required";
  } else if (values.name.includes(" ")) {
    errors.name = " Invalid User Name";
  }

  // validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password must be 8 to 20 character long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validation for confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password not match";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Password";
  }

  return errors;
}
