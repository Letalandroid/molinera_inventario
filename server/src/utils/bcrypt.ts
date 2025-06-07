import * as bcryptjs from 'bcryptjs';

const saltRounds = 10;

export const genHash = async (password: string): Promise<string> => {
    const hash = await bcryptjs.hash(password, saltRounds);
    return hash;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const match = await bcryptjs.compare(password, hash);
    return match;
}