import bcrypt from "bcrypt";

type HashPasswordType = (password: string) => Promise<string>;

type MatchPasswordType = (
  password: string,
  hashedPassword: string
) => Promise<boolean>;

export const hashPassword: HashPasswordType = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  console.log(encryptedPassword);
  return encryptedPassword;
};

export const matchPassword: MatchPasswordType = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};
