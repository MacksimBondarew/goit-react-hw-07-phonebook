import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const state = {
    contacts: {
        items: [],
        isLoading: false,
        error: null
    },
    filter: '',
};
const stateSlice = createSlice({
    name: 'state',
    initialState: state,
    reducers: {
        addNameContact(state, action) {
            state.contacts.push(action.payload);
        },
        deleteNameContact(state, action) {
            state.contacts = state.contacts.filter(name => name.id !== action.payload);
        },
        changeFilterContact(state, action) {
            state.filter = action.payload;
        },
    },
});

const persistCoonfig = {
    key: 'contacts',
    storage,
    whiteList: ['contacts'],
};

export const { addNameContact, deleteNameContact, changeFilterContact } = stateSlice.actions;

export const stateReducer = persistReducer(persistCoonfig, stateSlice.reducer);