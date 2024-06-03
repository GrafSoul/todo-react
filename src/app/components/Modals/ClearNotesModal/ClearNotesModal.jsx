import { Modal, Button } from 'react-bootstrap';
import styles from './ClearNotesModal.module.scss';

const ClearNotesModal = ({ show, onClose, onClear }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>Confirm Clear</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <p>Are you sure you want to clear this notes?</p>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onClear}>
                    Clear
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClearNotesModal;
