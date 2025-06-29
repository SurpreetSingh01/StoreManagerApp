import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProduct,
    updateProduct,
    setShowModal,
   
} from '../../redux/productSlice';

const ProductModal = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.products.showModal);
    const modalType = useSelector(state => state.products.modalType);
    const selectedProduct = useSelector(state => state.products.selectedProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (modalType === 'edit' && selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price);
        } else {
            setName('');
            setPrice('');
        }
    }, [modalType, selectedProduct]);

    const handleClose = () => dispatch(setShowModal(false));

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, price: parseFloat(price) };
        if (modalType === 'edit') {
            dispatch(updateProduct({ ...selectedProduct, ...product }));
        } else {
            dispatch(createProduct(product));
        }
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === 'edit' ? 'Edit Product' : 'New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            ❌ Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            {modalType === 'edit' ? '✏️ Update' : '➕ Create'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
