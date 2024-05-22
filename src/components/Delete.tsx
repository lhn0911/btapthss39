
import React, { useState } from 'react';

export default function Delete({ handleDelete }:any) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button className="button button-delete" onClick={confirmDelete}>
        Xóa
      </button>
      {showConfirmation && (
        <div className="overlay">
          <div className="modal-customwarning">
            <div className="modal-title">
              <h2>Cảnh báo</h2>
              <span className="fa fa-xmark" onClick={cancelDelete}></span>
            </div>
            <div className="modal-body-custom">
              <p>Bạn có chắc chắn muốn xoá tài khoản này?</p>
              <div style={{ textAlign: 'right' }}>
                <button className="btn btn-secondary" onClick={cancelDelete}>Hủy</button>
                <button className="btn btn-danger" onClick={handleDelete}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
