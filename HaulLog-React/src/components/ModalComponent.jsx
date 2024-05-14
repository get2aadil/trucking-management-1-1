import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        zIndex: 999999,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
};

function ModalComponent({ isOpen, onRequestClose, shipment }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Shipment Details"
        >
            <h2>Shipment Details</h2>
            <button onClick={onRequestClose}>Close</button>
            <div>
                <p><strong>Shipment ID:</strong> {shipment.shipmentId}</p>
                <p><strong>Truck ID:</strong> {shipment.truckId}</p>
                <p><strong>Shipment Date:</strong> {new Date(shipment.shipmentDate).toLocaleDateString()}</p>
                
            </div>
        </Modal>
    );
}

export default ModalComponent;
