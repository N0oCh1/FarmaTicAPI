import bcrypt from 'bcrypt';
import Salt from './Salt.js';

export default function encodePassword(password: string | null | undefined): string | null {
    if (!password) return null;
    return bcrypt.hashSync(password, Salt());
}