<script lang="ts">
  import { createHistory, createMemorySource } from "svelte-navigator";
  import { Router, Route, Link } from "svelte-navigator";

  import AuthView from "~/lib/views/popup/AuthView.svelte";

  const memoryHistory = createHistory(createMemorySource());
</script>

<main class="w-96 h-128 bg-secondary-1 border border-secondary-2 text-white">
  <div
    class="w-full bg-secondary-2 py-2 px-2 rounded-b-md shadow-sm flex justify-between items-center"
  >
    <h1>Fision</h1>
    <button class=" border border-blue-600 px-2 py-1 rounded-md"
      >Networks</button
    >
  </div>

  <div
    class="flex items-center justify-between border-y py-2 px-2 shadow-md bg-secondary-2 border-blue-500 w-full"
  >
    <Router history={memoryHistory}>
      <!-- ... -->
    </Router>
  </div>
</main>

<!--

    <div
    class="flex items-center justify-between border-y py-2 px-2 shadow-md bg-secondary-2 border-blue-500 w-full"
  >
    <div>Not Connected</div>
    <div class="flex flex-col items-center">
      <div class="text-sm">Account 1</div>
      <div class="text-xs text-white text-opacity-50">0x012...131</div>
    </div>
  </div>

  <div class="flex flex-col">
    <div
      class="text-sm w-full flex flex-col gap-1 items-center justify-center py-5 font-semibold"
    >
      <div class="text-lg">1000</div>
      <div class="text-xs">ETH</div>
    </div>
    <div class="flex justify-center gap-2 border-y py-2 border-blue-500">
      <button
        class="px-5 py-1 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-50"
        >Send</button
      >
      <button
        class="px-5 py-1 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-50"
        >Receive</button
      >
    </div>
  </div>
-->
