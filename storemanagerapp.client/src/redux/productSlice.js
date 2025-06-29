import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7040/api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        showModal: false,
        showDeleteModal: false,
        modalType: 'create',
        selectedProduct: null,
    },
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setShowDeleteModal: (state, action) => {
            state.showDeleteModal = action.payload;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.products[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            });
    },
});

export const {
    setShowModal,
    setShowDeleteModal,
    setModalType,
    setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
