import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [],
  status: "idle",
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(
      "https://684af783165d05c5d35b03df.mockapi.io/contacts",
    );
    return response.data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact) => {
    const response = await axios.post(
      "https://684af783165d05c5d35b03df.mockapi.io/contacts",
      newContact,
    );
    return response.data;
  },
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (contactId) => {
    await axios.delete(
      `https://684af783165d05c5d35b03df.mockapi.io/contacts/${contactId}`,
    );
    return contactId;
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
      });
  },
});

export default contactsSlice.reducer;