import { writable } from "svelte/store";
import { Wallet, Provider, Contract } from 'fuels'

export const wallet = writable(undefined)

//
export function signin(passphrase: string) {

}

export function signup(passphrase: string) { }

/* 
 var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
//U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=

var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
//4d657373616765

*/


