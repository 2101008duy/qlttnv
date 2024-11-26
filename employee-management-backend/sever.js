const express = require('express'); 
const mysql = require('mysql2'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
 
const app = express(); app.use(cors()); 
app.use(bodyParser.json()); 
 
// Kết nối với cơ sở dữ liệu MySQL 
    const db = mysql.createConnection({     
    host: 'localhost', 
    user: 'duyngu', 
    password: '2101008',     
    database: 'employee_management', 
}); 
 
db.connect(err => {     
    if (err) throw err; 
    console.log('Đã kết nối với cơ sở dữ liệu MySQL'); 
}); 


//lấy danh sách nhân viên
app.get('/employees', (req, res) => { 
    db.query('SELECT * FROM employees', (err, results) => {         if (err) throw err; 
        res.json(results); 
    }); }); 


//thêm nhân viên mới
app.post('/employees', (req, res) => {     const { name, age, department } = req.body; 
    db.query('INSERT INTO employees (name, age, department) VALUES (?, ?, ?)', 
[name, age, department], (err, results) => { 
        if (err) throw err; 
        res.json({ id: results.insertId, name, age, department }); 
    }); 
}); 

//sửa thông tin nhân viên
app.put('/employees/:id', (req, res) => {     const { id } = req.params; 
    const { name, age, department } = req.body; 
    db.query('UPDATE employees SET name = ?, age = ?, department = ? WHERE id = ?', [name, age, department, id], (err, results) => {         
        if (err) throw err; 
        res.json({ message: 'Cập nhật thành công' }); 
    }); }); 

//xóa thông tin nhân viên
app.delete('/employees/:id', (req, res) => {     const { id } = req.params; 
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {         if (err) throw err; 
        res.json({ message: 'Xóa thành công' }); 
    }); 
}); 

//khởi động server
const PORT = 5000; app.listen(PORT, () => { 
    console.log(`Server đang chạy trên cổng ${PORT}`); 
}); 
