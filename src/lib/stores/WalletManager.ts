import { writable } from "svelte/store";

const rootPath: string = `m/44'/60'/0'/0`;



const createWalletManager = () => {
    const isLocked = writable(true)
    const activeAccount = writable()

    function lock() {
        isLocked.set(true);

    }

    function unlock(passphrase: string) { }

    function accounts() { }

    function save() { }
    function load() { }

    return {
        isLocked,
        lock, unlock,
        accounts
    }
}

export default createWalletManager