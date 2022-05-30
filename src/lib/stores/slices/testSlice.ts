import { createSlice } from "@reduxjs/toolkit";

const pokemonSearchSlice = createSlice({
    name: "pokemonSearch",
    initialState: {
        searchInputValue: "test",
    },
    reducers: {
        setValue: (state: { searchInputValue: any; }, action: { payload: any; }) => {
            state.searchInputValue = action.payload;
        },
    },
});

export { pokemonSearchSlice }
export default pokemonSearchSlice.reducer;