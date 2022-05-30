import browser from "webextension-polyfill";
import pokemonSearchSlice from '~/lib/stores/slices/testSlice';
import { configureStore } from "@reduxjs/toolkit";
import { wrapStore } from 'webext-redux';

const store = configureStore({
  reducer: {
    pokemon: pokemonSearchSlice,
  },
});

wrapStore(store)

