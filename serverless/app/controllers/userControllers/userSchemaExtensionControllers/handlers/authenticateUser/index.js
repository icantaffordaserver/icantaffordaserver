import bcrypt from "bcrypt";
import { isEmail } from "validator";
import { fromEvent } from "graphcool-lib";

import { createClient } from "../../../../../../config/GraphQLClient";

import getUserByEmailQuery from "../../../../../graphql/queries/getUserByEmailQuery";

export default async (req, res) => {
  const { email, password } = req.body.data;
  const graphcool = fromEvent(req.body);

  if (!isEmail(email)) throw new Error("Invalid Credentials.");

  try {
    const client = createClient();
    const response = await client.request(getUserByEmailQuery, { email });

    if (!response.User) throw new Error("Invalid Credentials.");

    const user = response.User;

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error("Invalid Credentials.");
    const token = await graphcool.generateAuthToken(user.id, "User");
    res.status(200).send({
      message: "Logged in.",
      data: { token }
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};
