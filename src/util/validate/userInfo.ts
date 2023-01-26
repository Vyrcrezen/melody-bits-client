import { validate, ValidationError } from "class-validator";

import {
  VblUserBio,
  VblUserEmail,
  VblUsername,
  VblUserPassword,
} from "../../models/validator/userInfo";

export async function validateUserEmail(email: string) {
  const vblUserEmail = new VblUserEmail(email);
  const validationResult = await validate(vblUserEmail);

  return validationResult;
}

export async function validateUserPassword(password: string) {
  const vblUserPassword = new VblUserPassword(password);
  const validationResult = await validate(vblUserPassword);

  return validationResult;
}

export async function validateUserRePassword(
  password: string,
  rePassword: string
) {
  const validationResult: ValidationError[] = [];

  if (password !== rePassword) {
    validationResult.push({
      children: [],
      property: "user_rePassword",
      value: rePassword,
      constraints: {
        equals: "AC_004;The two passwords must match",
      },
    });
  }
  return validationResult;
}

export async function validateUsername(username: string) {
  const vblUsername = new VblUsername(username);
  const validationResult = await validate(vblUsername);

  return validationResult;
}

export async function validateUserBio(bio: string) {
  const vblBio = new VblUserBio(bio);
  const validationResult = await validate(vblBio);

  return validationResult;
}
