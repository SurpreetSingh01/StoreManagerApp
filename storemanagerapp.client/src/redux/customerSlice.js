import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7040/api/customers';

// Async Thunks
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const createCustomer = createAsyncThunk('customers/createCustomer', async (customer) => {
    const response = await axios.post(API_URL, customer);
    return response.data;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (customer) => {
    const response = await axios.put(`${API_URL}/${customer.id}`, customer);
    return response.data;
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Initial state
const initialState = {
    customers: [],
    loading: false,
    error: null,
    showModal: false,
    showDeleteModal: false,
    modalType: 'create', // or 'edit'
    selectedCustomer: null,
};

// Slice
const customerSlice = createSlice({
    name: 'customers',
    initialState,
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
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(c => c.id !== action.payload);
            });
    }
});

// Export actions and reducer
export const {
    setShowModal,
    setShowDeleteModal,
    setModalType,
    setSelectedCustomer
} = customerSlice.actions;

export default customerSlice.reducer;
