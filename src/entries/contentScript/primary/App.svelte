<script lang="ts">
  import browser from "webextension-polyfill";

  function codeToInject(param: string) {
    // Do here whatever your script requires. For example:
    /// @ts-ignore
    window.foo = param;
  }

  function embed(fn, params) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})("${params}");`;

    console.log(script.text);

    document.documentElement.appendChild(script);
  }

  embed(codeToInject, "aa");
</script>

<!--Empty-->
<!---->
