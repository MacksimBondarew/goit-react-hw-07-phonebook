import { createSlice } from '@reduxjs/toolkit';
import { featchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
    state.contacts.isLoading = true;
};
const handleRejected = (state, action) => {
    state.contacts.isLoading = false;
    state.contacts.error = action.payload;
};

const state = {
    contacts: {
        items: [],
        isLoading: false,
        error: null,
    },
};
const contacts = createSlice({
    name: 'state',
    initialState: state,
    extraReducers: builder => {
        builder
            .addCase(featchContacts.pending, handlePending)
            .addCase(featchContacts.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = null;
                state.contacts.items = action.payload;
            })
            .addCase(featchContacts.rejected, handleRejected);
        builder
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = null;
                state.contacts.items.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected);
        builder
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = null;
                state.contacts.items = state.contacts.items.filter(
                    name => name.id !== action.payload
                );
            });
    },
});

export const contactsReducer = contacts.reducer;
