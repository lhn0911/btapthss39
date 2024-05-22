import React, { useState } from 'react';

interface EmployeeData {
  id: number;
  name: string;
  birthday: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
}

interface EditProps {
  employee: EmployeeData;
  handleUpdateEmployee: (updatedEmployee: EmployeeData) => void;
}

export default function Edit({ employee, handleUpdateEmployee }: EditProps) {
  const [editEmployee, setEditEmployee] = useState<EmployeeData>(employee);
  const [showEditModal, setShowEditModal] = useState(false);
  const [errors, setErrors] = useState({ name: '', birthday: '', email: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', birthday: '', email: '' };

    if (!editEmployee.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống.';
      isValid = false;
    }

    if (!editEmployee.email.trim()) {
      newErrors.email = 'Email không được để trống.';
      isValid = false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (editEmployee.birthday > today) {
      newErrors.birthday = 'Ngày sinh không được lớn hơn ngày hiện tại.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  const handleEditSubmit = () => {
    if (validateForm()) {
      handleUpdateEmployee(editEmployee);
      setShowEditModal(false);
    }
  };

  return (
    <div>
      <button className="button button-edit" onClick={() => setShowEditModal(true)}>
        Sửa
      </button>
      {showEditModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Sửa nhân viên</h4>
              <span className="fa fa-xmark" onClick={() => setShowEditModal(false)}></span>
            </div>
            <div className="modal-body-custom">
              <label className="form-label">Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={editEmployee.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <div className="error">{errors.name}</div>}

              <label className="form-label">Ngày sinh:</label>
              <input
                type="date"
                name="birthday"
                value={editEmployee.birthday}
                onChange={handleInputChange}
                required
              />
              {errors.birthday && <div className="error">{errors.birthday}</div>}

              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={editEmployee.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <label className="form-label">Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={editEmployee.address}
                onChange={handleInputChange}
                required
              />

              <button className="btn btn-success" onClick={handleEditSubmit}>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}