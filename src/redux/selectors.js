export const selectFilter = state => state.filter.filter;
export const selectContacts = state => state.contacts.contacts.items;
export const selectLoading = state => state.contacts.contacts.isLoading;
export const selectError = state => state.contacts.contacts.error;