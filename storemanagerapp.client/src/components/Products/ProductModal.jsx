import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProduct,
    updateProduct,
    fetchProducts,
    setShowModal
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

    const handleSubmit = async () => {
        const product = { name, price: parseFloat(price) };

        if (modalType === 'edit') {
            await dispatch(updateProduct({ ...selectedProduct, ...product }));
        } else {
            await dispatch(createProduct(product));
        }

        await dispatch(fetchProducts()); // refresh list after add/edit
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === 'edit' ? 'Edit Product' : 'New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="success" onClick={handleSubmit}>
                    {modalType === 'edit' ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
