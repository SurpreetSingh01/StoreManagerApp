import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://localhost:7040/api/sale';

// Async Thunks for sale CRUD
export const fetchSale = createAsyncThunk('sale/fetchSale', async () => {
    const res = await axios.get(API_URL);
    return res.data;
});

export const createSale = createAsyncThunk('sale/createSale', async (sale) => {
    const res = await axios.post(API_URL, sale);
    return res.data;
});

export const updateSale = createAsyncThunk('sale/updateSale', async (sale) => {
    const res = await axios.put(`${API_URL}/${sale.id}`, sale);
    return res.data;
});

export const deleteSale = createAsyncThunk('sale/deleteSale', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// 👉 Also fetch Customers, Products, Stores for dropdowns
export const fetchCustomers = createAsyncThunk('sale/fetchCustomers', async () => {
    const res = await axios.get('https://localhost:7040/api/customer');
    return res.data;
});

export const fetchProducts = createAsyncThunk('sale/fetchProducts', async () => {
    const res = await axios.get('https://localhost:7040/api/product');
    return res.data;
});

export const fetchStores = createAsyncThunk('sale/fetchStores', async () => {
    const res = await axios.get('https://localhost:7040/api/store');
    return res.data;
});

const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        sale: [],
        customers: [],
        products: [],
        stores: [],
        showModal: false,
        modalType: 'create',
        selectedSale: null,
        showDeleteModal: false,
    },
    reducers: {
        setShowModal: (state, action) => { state.showModal = action.payload; },
        setModalType: (state, action) => { state.modalType = action.payload; },
        setSelectedSale: (state, action) => { state.selectedSale = action.payload; },
        setShowDeleteModal: (state, action) => { state.showDeleteModal = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSale.fulfilled, (state, action) => {
                state.sale = action.payload;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.sale.push(action.payload);
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                const idx = state.sale.findIndex(s => s.id === action.payload.id);
                if (idx !== -1) state.sale[idx] = action.payload;
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.sale = state.sale.filter(s => s.id !== action.payload);
            })

            // For dropdowns
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.customers = action.payload;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.stores = action.payload;
            });
    }
});

export const {
    setShowModal,
    setModalType,
    setSelectedSale,
    setShowDeleteModal
} = saleSlice.actions;

export default saleSlice.reducer;
