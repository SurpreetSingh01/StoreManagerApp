import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://localhost:7040/api/store';


export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const createStore = createAsyncThunk('stores/createStore', async (store) => {
    const response = await axios.post(API_URL, store);
    return response.data;
});

export const updateStore = createAsyncThunk('stores/updateStore', async (store) => {
    const response = await axios.put(`${API_URL}/${store.id}`, store);
    return response.data;
});

export const deleteStore = createAsyncThunk('stores/deleteStore', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});


const initialState = {
    stores: [],             
    showModal: false,
    showDeleteModal: false,
    modalType: 'create',
    selectedStore: null,
    loading: false,
    error: null,
};

const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setShowModal: (state, action) => { state.showModal = action.payload; },
        setShowDeleteModal: (state, action) => { state.showDeleteModal = action.payload; },
        setModalType: (state, action) => { state.modalType = action.payload; },
        setSelectedStore: (state, action) => { state.selectedStore = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.stores = action.payload;
            })
            .addCase(createStore.fulfilled, (state, action) => {
                state.stores.push(action.payload);
            })
            .addCase(updateStore.fulfilled, (state, action) => {
                const index = state.stores.findIndex(s => s.id === action.payload.id);
                if (index !== -1) state.stores[index] = action.payload;
            })
            .addCase(deleteStore.fulfilled, (state, action) => {
                state.stores = state.stores.filter(s => s.id !== action.payload);
            });
    }
});

export const { setShowModal, setShowDeleteModal, setModalType, setSelectedStore } = storeSlice.actions;
export default storeSlice.reducer;
