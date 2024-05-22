import React, { useState } from 'react';

export default function Add({ newEmployee, handleInputChange, handleAddEmployee }:any) {
  const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    email: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', birthday: '', email: '' };

    if (!newEmployee.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống.';
      isValid = false;
    }
    if (!newEmployee.email.trim()) {
      newErrors.email = 'Email không được để trống.';
      isValid = false;
    }
    const today = new Date().toISOString().split('T')[0];
    if (newEmployee.birthday > today) {
      newErrors.birthday = 'Ngày sinh không được lớn hơn ngày hiện tại.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddEmployee();
    }
  };

  return (
    <div className="form">
      <label className="form-label">Họ và tên:</label>
      <input
        type="text"
        name="name"
        value={newEmployee.name}
        onChange={handleInputChange}
        required
      />
      {errors.name && <div className="error">{errors.name}</div>}

      <label className="form-label">Ngày sinh:</label>
      <input
        type="date"
        name="birthday"
        value={newEmployee.birthday}
        onChange={handleInputChange}
        required
      />
      {errors.birthday && <div className="error">{errors.birthday}</div>}

      <label className="form-label">Email:</label>
      <input
        type="email"
        name="email"
        value={newEmployee.email}
        onChange={handleInputChange}
        required
      />
      {errors.email && <div className="error">{errors.email}</div>}

      <label className="form-label">Địa chỉ:</label>
      <input
        type="text"
        name="address"
        value={newEmployee.address}
        onChange={handleInputChange}
        required
      />

      <button className="btn btn-success" onClick={handleSubmit}>Thêm mới</button>
    </div>
  );
}
