import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchProducts,
    setShowModal,
    setModalType,
    setSelectedProduct,
    setShowDeleteModal,
} from '../../redux/productSlice';
import ProductModal from './ProductModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { Table, Button } from 'react-bootstrap';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const showModal = useSelector((state) => state.products.showModal);
    const showDeleteModal = useSelector((state) => state.products.showDeleteModal);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = () => {
        dispatch(setModalType('create'));
        dispatch(setSelectedProduct(null));
        dispatch(setShowModal(true));
    };

    const handleEdit = (product) => {
        dispatch(setModalType('edit'));
        dispatch(setSelectedProduct(product));
        dispatch(setShowModal(true));
    };

    const handleDelete = (product) => {
        dispatch(setSelectedProduct(product));
        dispatch(setShowDeleteModal(true));
    };

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Product List</h4>
                <Button variant="primary" onClick={handleAdd}>New Product</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th colSpan={2} className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td className="text-center">
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(product)}>✏️ Edit</Button>
                                </td>
                                <td className="text-center">
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product)}>🗑️ Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {showModal && <ProductModal />}
            {showDeleteModal && <DeleteConfirmationModal />}
        </div>
    );
};

export default ProductList;
