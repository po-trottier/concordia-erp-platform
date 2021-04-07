import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// algorithm constants
const hashAlgorithm = 'sha256';
const cipherAlgorithm = 'aes256';

const encryptFile = (envPath, filePath, password) => {
  // normalize file paths
  const encryptedFile = path.normalize(filePath);
  envPath = path.normalize(envPath);

  // shrink file
  const fileData = fs.readFileSync(envPath, 'utf8');
  const gzipped = Buffer.from(fileData, 'utf8').toString('base64');

  // encrypt
  const key = crypto.createHash(hashAlgorithm).update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(cipherAlgorithm, key, iv);
  const encrypted = Buffer.concat([
    iv,
    cipher.update(gzipped),
    cipher.final(),
  ]).toString('base64');

  // write encrypted.env file
  fs.writeFileSync(encryptedFile, encrypted, 'utf8');

  // return encrypted.env file path
  return encryptedFile;
};

const decryptFile = (filePath, envPath, password) => {
  // normalize file paths
  const decFile = path.normalize(envPath);
  filePath = path.normalize(filePath);

  // get file
  let fileData = Buffer.from(fs.readFileSync(filePath, 'utf8'), 'base64');

  // decryption credentials
  const key = crypto.createHash(hashAlgorithm).update(password).digest();
  const iv = fileData.slice(0, 16);
  fileData = fileData.slice(16);

  // decrypt
  const decipher = crypto.createDecipheriv(cipherAlgorithm, key, iv);
  const gzipped = Buffer.concat([
    decipher.update(fileData),
    decipher.final(),
  ]).toString();
  const decrypted = Buffer.from(gzipped, 'base64').toString('utf8');

  // write to decrypted file to .env
  fs.writeFileSync(decFile, String(decrypted).trim(), 'utf8');

  // return .env path
  return decFile;
};

export const decrypt = (password) => {
  try {
    password = String(password).trim();

    const encryptedFileServer = path.join(__dirname, '../../server/.env.enc');
    const envFileServer = path.join(__dirname, '../../server/.env');

    const encryptedFileClient = path.join(__dirname, '../../client/.env.enc');
    const envFileClient = path.join(__dirname, '../../client/.env');

    const server = decryptFile(encryptedFileServer, envFileServer, password);
    const client = decryptFile(encryptedFileClient, envFileClient, password);

    return { server, client }
  } catch (error) {
    return null;
  }
};

export const encrypt = (password) => {
  try {
    password = String(password).trim();

    const envFileServer = path.join(__dirname, '../../server/.env');
    const encryptedFileServer = path.join(__dirname, '../../server/.env.enc');

    const envFileClient = path.join(__dirname, '../../client/.env');
    const encryptedFileClient = path.join(__dirname, '../../client/.env.enc');

    const server = encryptFile(envFileServer, encryptedFileServer, password);
    const client = encryptFile(envFileClient, encryptedFileClient, password);

    return { server, client }
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *
 * Sources:
 * [Link] https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e
 * [Link] https://medium.com/@anned20/encrypting-files-with-nodejs-a54a0736a50a
 *
 */
