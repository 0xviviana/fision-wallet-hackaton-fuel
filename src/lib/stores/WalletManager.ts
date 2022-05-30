import Browser from "webextension-polyfill";
import { createStore } from "solid-js/store";
import { Wallet } from 'fuels'

import CryptoJS from 'crypto-js'
import wallet from '~/lib/stores/wallet';


export const STORAGE_KEY = "FISION_WALLET"

/*
    MNEMONIC PHRASE: 15 WORDS
    ----
    IS_INITIALIZED
    IS_UNLOCKED
*/

export interface WalletStorage {
    secret: string
}

const createWalletManager = () => {
    const rootPath = `m/44'/60'/0'/0`

    const [state, setState] = createStore({
        isLocked: true,
        isInitialized: false,
        wallet: undefined,
        selectedWallet: 0
    });

    function lock() {
        setState("isLocked", true)
    }


    async function unlock(passphrase: string) {
        const storageData = await Browser.storage?.local?.get(STORAGE_KEY)

        let data: WalletStorage = JSON.parse(CryptoJS.AES.decrypt(storageData[STORAGE_KEY], passphrase).toString(CryptoJS.enc.Utf8));

        if (data['secret'] === undefined) {
            throw new Error("Mnemonic Phrase invalid")
        }

        setState("wallet", Wallet.fromMnemonic(data.secret, rootPath))
        setState("isLocked", false)
    }

    function accounts() { }

    function save() { }
    function load() { }

    async function initializeWallet(data: {
        secret: string,
        passphrase: string
    }) {
        const obj: WalletStorage = {
            secret: data.secret
        }

        let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), data.passphrase);

        await Browser.storage.local.set({
            [STORAGE_KEY]: encryptedData.toString()
        })
    }

    async function clear() {
        await Browser.storage.local.clear()
        await fetchInitializedStatus()
    }

    async function fetchInitializedStatus() {
        try {
            const status = await Browser.storage?.local?.get(STORAGE_KEY)
            console.log(status)
            setState("isInitialized", status[STORAGE_KEY] !== undefined)

            return state.isInitialized
        } catch (err) {
            console.error(err)

            setState("isInitialized", false)

            return state.isInitialized
        }
    }

    return {
        isLocked: () => state.isLocked,
        isInitialized: () => state.isInitialized,
        initializeWallet, clear,
        lock, unlock,
        accounts,
        fetchInitializedStatus
    }
}

export default createWalletManager