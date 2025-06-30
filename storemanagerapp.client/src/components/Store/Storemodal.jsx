import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createStore,
    updateStore,
    fetchStores,
    setShowModal
} from '../../redux/storeSlice';

const StoreModal = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.stores.showModal);
    const modalType = useSelector(state => state.stores.modalType);
    const selectedStore = useSelector(state => state.stores.selectedStore);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (modalType === 'edit' && selectedStore) {
            setName(selectedStore.name);
            setAddress(selectedStore.address);
        } else {
            setName('');
            setAddress('');
        }
    }, [modalType, selectedStore]);

    const handleClose = () => dispatch(setShowModal(false));

    const handleSubmit = async () => {
        if (!name.trim() || !address.trim()) {
            alert("Name and Address are required.");
            return;
        }

        const store = { name, address };

        if (modalType === 'edit') {
            await dispatch(updateStore({ ...selectedStore, ...store }));
        } else {
            await dispatch(createStore(store));
        }

        // Ensure the list updates
        await dispatch(fetchStores());

        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === 'edit' ? 'Edit Store' : 'New Store'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter store name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
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

export default StoreModal;
