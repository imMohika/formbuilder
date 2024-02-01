import { customAlphabet } from 'nanoid';

const numbers = '123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomString = () => {
	const alphabet = numbers + lowercase + uppercase;
	return customAlphabet(alphabet);
};

export const random = {
	string: randomString(),
};
