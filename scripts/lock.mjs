import { encrypt } from './common/encryption.mjs';

let env;

if (!process.argv[2]) {
  console.error('Please input the password...');
} else {
  env = encrypt(process.argv[2]);
}

if (env && env.server && env.client) {
  console.log('The environment variables were locked successfully!');
} else {
  console.log('Something went wrong during the encryption.');
}
