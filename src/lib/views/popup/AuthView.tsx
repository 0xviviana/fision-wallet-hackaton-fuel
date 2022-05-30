import {
  Match,
  Switch,
  onMount,
  createSignal,
  createMemo,
  Show,
} from "solid-js";
import Browser from "webextension-polyfill";
import en_wordlist from "~/lib/helpers/en_wordlist";
import { getMnemonicPhrase } from "~/lib/helpers/wordlistHelper";
import wallet from "~/lib/stores/wallet";
import MnemonicShow from "../../components/primitives/MnemonicShow";
import PasswordInput from "../../components/primitives/PasswordInput";

function NewWalletPage() {
  const [pass1, setPass1] = createSignal({
    value: "",
    error: "",
  });

  const [pass2, setPass2] = createSignal({
    value: "",
    error: "",
  });

  const [_mp, _setMp] = createSignal("");

  onMount(() => {
    _setMp(getMnemonicPhrase(en_wordlist));
  });

  const samePasswords = createMemo(() => {
    if (pass1().value === pass2().value) {
      return true;
    }

    return false;
  });

  const canSubmit = createMemo(() => {
    if (pass1().value.length <= 0 || pass2().value.length <= 0) {
      return false;
    }

    if (pass1().error.length > 0 || pass2().error.length > 0) {
      return false;
    }

    return samePasswords();
  });

  async function createNewWallet() {
    wallet.initializeWallet({
      secret: _mp(),
      passphrase: pass1().value,
    });

    await wallet.fetchInitializedStatus();
  }

  return (
    <div class="flex flex-col gap-2">
      <div>Generate New Wallet</div>
      <MnemonicShow phrase={[_mp, _setMp]} />
      <button onClick={() => _setMp(getMnemonicPhrase(en_wordlist))}>
        Generate New Mnemonic Phrase
      </button>

      <div class=" inline-flex flex-col">
        <label for="pass_1">Password:</label>
        <PasswordInput setData={setPass1} getData={pass1} id="pass_1" />
      </div>

      <div class=" inline-flex flex-col">
        <label for="pass_2">Confirm Password:</label>
        <PasswordInput setData={setPass2} getData={pass2} id="pass_2" />
      </div>

      <Show when={!samePasswords()}>
        <div>Passwords aren't the same</div>
      </Show>

      <button
        classList={{
          "pointer-events-none opacity-50": !canSubmit(),
        }}
        onClick={createNewWallet}
      >
        Create New Wallet
      </button>
    </div>
  );
}
function LoadWalletPage() {
  return (
    <>
      <div>Seed phrase</div>
      <input></input>
      <button>Login</button>
    </>
  );
}

export default function AuthView() {
  const [selectedTab, setSelectedTab] = createSignal(0);

  const [passphrase, setPassphrase] = createSignal({
    value: "",
    error: "",
  });

  onMount(async () => {
    await wallet.fetchInitializedStatus();
  });

  async function unlockWallet() {
    try {
      await wallet.unlock(passphrase().value);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Switch>
        <Match when={!wallet.isInitialized()}>
          <div class="flex flex-col">
            <div class="flex gap-2">
              <button
                onClick={() => setSelectedTab(0)}
                classList={{
                  "bg-blue-500 bg-opacity-50": selectedTab() === 0,
                }}
                class="border p-1 rounded-lg border-blue-500"
              >
                New Wallet
              </button>
              <button
                onClick={() => setSelectedTab(1)}
                classList={{
                  "bg-blue-500 bg-opacity-50": selectedTab() === 1,
                }}
                class="border p-1 rounded-lg border-blue-500"
              >
                Existent Wallet
              </button>
            </div>

            <div class="p-1 border border-blue-500 my-1 rounded-md border-opacity-30">
              <Switch>
                <Match when={selectedTab() === 0}>
                  <NewWalletPage />
                </Match>
                <Match when={selectedTab() === 1}>
                  <LoadWalletPage />
                </Match>
              </Switch>
            </div>
          </div>
        </Match>
        <Match when={wallet.isLocked()}>
          <div class="inline-flex flex-col items-center w-full gap-2">
            <div class="text-xl">Unlock your wallet</div>
            <div class=" inline-flex flex-col w-full">
              <label for="pass_2">Password:</label>
              <PasswordInput
                setData={setPassphrase}
                getData={passphrase}
                id="pass_2"
              />
            </div>
            <button onClick={unlockWallet} class="w-full">
              Unlock
            </button>
            <button
              onClick={() => {
                Browser.runtime.sendMessage({
                  callFunc: () => {
                    console.log("Hello world");
                  },
                  test: "Hello world",
                });
                // Browser.runtime.sendMessage();
              }}
            >
              D
            </button>
            <button onClick={() => wallet.clear()}>Clear</button>
          </div>
        </Match>
      </Switch>
    </>
  );
}
