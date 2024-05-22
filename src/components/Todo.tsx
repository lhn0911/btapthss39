import React, { useState } from 'react';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';

interface Employee {
  id: number;
  name: string;
  birthday: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
}

interface NewEmployeeData {
  name: string;
  birthday: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
}

export default function Todo() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Nguyễn Văn A', birthday: '28/02/1990', email: 'nvana@gmail.com', address: 'Ba Đình, Hà Nội', status: 'active' },
    { id: 2, name: 'Trần Thị B', birthday: '15/07/1985', email: 'ttb@gmail.com', address: 'Cầu Giấy, Hà Nội', status: 'inactive' },
    { id: 3, name: 'Lê Văn C', birthday: '03/10/2000', email: 'lvc@gmail.com', address: 'Hai Bà Trưng, Hà Nội', status: 'inactive' },
    { id: 4, name: 'Phạm Thị D', birthday: '20/05/1995', email: 'ptd@gmail.com', address: 'Hoàn Kiếm, Hà Nội', status: 'active' },
    { id: 5, name: 'Ngô Văn E', birthday: '12/11/1988', email: 'nve@gmail.com', address: 'Cầu Giấy, Hà Nội', status: 'active' }
  ]);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<NewEmployeeData>({
    name: '',
    birthday: '',
    email: '',
    address: '',
    status: 'active'
  });

  const [showConfirmBlock, setShowConfirmBlock] = useState<boolean>(false);
  const [employeeToBlock, setEmployeeToBlock] = useState<Employee | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    setEmployees([...employees, { ...newEmployee, id: newId }]);
    setShowForm(false);
    setNewEmployee({ name: '', birthday: '', email: '', address: '', status: 'active' });
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = (id: number) => {
    const filteredEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(filteredEmployees);
  };

  const handleBlockEmployee = (employee: Employee) => {
    setShowConfirmBlock(true);
    setEmployeeToBlock(employee);
  };

  const confirmBlockEmployee = () => {
    if (employeeToBlock) {
      const updatedEmployees = employees.map((employee): Employee =>
        employee.id === employeeToBlock.id ? { ...employee, status: employee.status === 'active' ? 'inactive' : 'active' } : employee
      );
      setEmployees(updatedEmployees);
      setShowConfirmBlock(false);
      setEmployeeToBlock(null);
    }
  };

  const cancelBlockEmployee = () => {
    setShowConfirmBlock(false);
    setEmployeeToBlock(null);
  };

  return (
    <div className="w-[80%] m-auto mt-4 h-[100vh]">
     <main className="main">
        <header className="d-flex justify-content-between mb-3">
          <h3>Danh sách nhân viên</h3>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Thêm mới nhân viên</button>
        </header>

        {showForm && (
          <div className="overlay">
            <div className="modal-custom">
              <div className="modal-title">
                <h4>Thêm mới nhân viên</h4>
                <span className="fa fa-xmark" onClick={() => setShowForm(false)}></span>
              </div>
              <div className="modal-body-custom">
                <Add 
                  newEmployee={newEmployee}
                  handleInputChange={handleInputChange}
                  handleAddEmployee={handleAddEmployee}
                />
              </div>
            </div>
          </div>
        )}

        {showConfirmBlock && (
          <div className="overlay">
            <div className="modal-customwarning">
              <div className="modal-title">
                <h4>Xác nhận chặn nhân viên</h4>
              </div>
              <div className="modal-body-custom">
                <p>Bạn có chắc chắn muốn {employeeToBlock && (employeeToBlock.status === 'active' ? 'chặn' : 'bỏ chặn')} nhân viên "{employeeToBlock?.name}"?</p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary mr-2" onClick={cancelBlockEmployee}>Hủy</button>
                  <button className="btn btn-primary1" onClick={confirmBlockEmployee}>Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div  style={{display:'flex', flexDirection:'row',justifyContent:'end'}}>
        <input  type="text" placeholder='Tìm kiếm theo email' /><i className="fa-solid fa-arrows-rotate"></i>

        </div>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th colSpan={3}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.birthday}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={`status ${employee.status === 'active' ? 'status-active' : 'status-stop'}`}></div>
                    <span>{employee.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                  </div>
                </td>
                <td>
                  <button className="button button-block" onClick={() => handleBlockEmployee(employee)}>
                    {employee.status === 'active' ? 'Chặn' : 'Bỏ chặn'}
                  </button>
                </td>
                <td>
                  <Edit employee={employee} handleUpdateEmployee={handleUpdateEmployee}/>
                </td>
                <Delete handleDelete={() => handleDeleteEmployee(employee.id)} />
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="d-flex justify-content-end align-items-center gap-3">
          <select className="form-select">
            <option selected>Hiển thị 10 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 50 bản ghi trên trang</option>
            <option>Hiển thị 100 bản ghi trên trang</option>
          </select>
        </footer>
      </main>

    </div>

  );

}