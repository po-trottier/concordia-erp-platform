import { decrypt } from './common/encryption.mjs';

let env;

if (!process.argv[2]) {
  console.error('Please input the password...');
} else {
  env = decrypt(process.argv[2]);
}

if (env && env.server && env.client) {
  console.log('Environment variables were unlocked successfully!');
} else {
  console.log('Something went wrong during the decryption.');
}
