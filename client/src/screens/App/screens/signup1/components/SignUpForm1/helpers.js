import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import moment from "moment";

export function validateSignUp(firstName, lastName, email, password, dob) {
  const DOB_FORMAT = "DD/MM/YYYY";
  const isFieldEmpty =
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(email) ||
    isEmpty(password) ||
    isEmpty(dob.toString());
  if (isFieldEmpty) return "All fields must be completed";
  const isEmailValid = isEmail(email);
  if (!isEmailValid) return "Please enter a valid email";

  const oldEnough = moment(dob, DOB_FORMAT).isBefore(
    moment().subtract(18, "y")
  );
  console.log(oldEnough);
  if (!oldEnough) return "Must be over the age of 18";
  return false;
}
