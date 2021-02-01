import { environment } from 'src/environments/environment';
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

export class CryptoService {
  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    this.privateKey = environment.cryptoPrivateKey;
    this.publicKey = environment.cryptoPublicKey;
    this.enabled = environment.cryproEnabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled)
      return plaintext;

    let buffer = new Buffer(plaintext);
    let encrypted = crypto.privateEncrypt(this.privateKey, buffer);

    return encrypted.toString('base64');
  }

  decrypt(cypher: string): string {
    if (!this.enabled)
      return cypher;

    let buffer = Buffer.from(cypher, 'base64');
    let plaintext = crypto.publicDecrypt(this.publicKey, buffer);

    return plaintext.toString('utf8')
  }
}
