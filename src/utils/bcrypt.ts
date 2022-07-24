import * as bcrypt from 'bcrypt';

export function encodingPassword(rawPassword: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash)

}