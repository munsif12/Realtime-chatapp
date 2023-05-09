import Modal from "antd/lib/modal/Modal";
import { useState } from "react";

function ConfirmationModal({ title = "dummy", content = "no content available", onOk, onCancel }) {
    const [visible, setVisible] = useState(false);
    const handleOk = () => {
        onOk();
        setVisible(false);
    }
    const handleCancel = () => {
        onCancel();
        setVisible(false);
    }
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
        >
            <p>{content}</p>
        </Modal>

    )
}

export default ConfirmationModal