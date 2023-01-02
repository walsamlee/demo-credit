import bcrypt from 'bcrypt';

export const hash = async (password: string, saltRounds: number = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log('error: ', error)
  }

  return null;
}