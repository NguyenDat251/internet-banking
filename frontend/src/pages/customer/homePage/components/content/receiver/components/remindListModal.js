import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const RemindListModal = (props) => {
  const handleClose = () => props.setShow(false);
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        {props.isModalEdit === false && (
          <button className="btn btn-success" onClick={handleClose}>
            Tạo
          </button>
        )}
        {props.isModalEdit === true && (
          <button className="btn btn-success" onClick={handleClose}>
            Cập nhật
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClose}>
          Hủy bỏ
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemindListModal;
