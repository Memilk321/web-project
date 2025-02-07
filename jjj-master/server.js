const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const port = 10000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Serve static files from the 'css' directory
app.use('/css', express.static(__dirname + '/css'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/main', (req, res) => {
  res.render('main', { data:null });
})
app.get("/login",(req, res)=>{
  res.render('login', { data:null });
})
app.get("/pegoin",(req, res)=>{
  res.render('Pegoin', { data:null });
})
app.get("/referral",(req, res)=>{
  res.render('referral', { data:null });
})
app.get("/diagnosis",(req, res)=>{
  res.render('Diagnosis', { data:null });
})
app.get("/sign-up",(req, res)=>{
  res.render('sign-up', { data:null });
})

// เชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
    return;
  }
  console.log('✅ MySQL Connected!');
});


// pegoin
// API สำหรับดึงข้อมูลทั้งหมดจากฐานข้อมูล
app.get('/BOP/data', (req, res) => {
  const sql = 'SELECT * FROM emergency_patients';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
    res.json(results);
  });
});

// API สำหรับบันทึกข้อมูลลงฐานข้อมูล
app.post('/pegoin', (req, res) => {
  const { date, prefix, fname, lname, gender, age, record_id, 
    id_card, nationality, insurance_id, health_insurance, address, 
    phone, symptoms, allergy, medication, disease_history, last_meal, 
    emergency_event, emergency_level, interviewer_prefix, interviewer_fname, interviewer_lname } = req.body;

  if (!fname || !lname || !date || !emergency_level) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน' });
  }

  const sql = 'INSERT INTO emergency_patients (date, prefix, fname, lname, gender, age, record_id, id_card, nationality, insurance_id, health_insurance, address, phone, symptoms, allergy, medication, disease_history, last_meal, emergency_event, emergency_level, interviewer_prefix, interviewer_fname, interviewer_lname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [date, prefix, fname, lname, gender, age, record_id, 
    id_card, nationality, insurance_id, health_insurance, address, 
    phone, symptoms, allergy, medication, disease_history, last_meal, 
    emergency_event, emergency_level, interviewer_prefix, interviewer_fname, interviewer_lname], (err, results) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
    res.json({ success: true, id: results.insertId });
  });
});



// referrals
// API สำหรับดึงข้อมูล
app.get('/BOP/data', (req, res) => {
  const sql = 'SELECT * FROM referrals';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
    res.json(results);
  });
});

// API สำหรับบันทึกข้อมูลลงฐานข้อมูล
app.post('/referral', (req, res) => {
  const {
    date, hospital, hospital_address, hospital_phone,
    patient_name, patient_id, gender, age, dob,
    patient_address, patient_phone
  } = req.body;

  // ตรวจสอบข้อมูลที่สำคัญ
  if (!patient_name || !date || !gender || !patient_address) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน' });
  }

  // สร้างคำสั่ง SQL สำหรับการบันทึกข้อมูล
  const sql = `INSERT INTO referrals (
    date, hospital, hospital_address, hospital_phone,
    patient_name, patient_id, gender, age, dob,
    patient_address, patient_phone
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  

  // ส่งข้อมูลไปยังฐานข้อมูล
  db.query(sql, [
    date, hospital, hospital_address, hospital_phone,
    patient_name, patient_id, gender, age, dob,
    patient_address, patient_phone
  ], (err, results) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
    res.json({ success: true, id: results.insertId });
  });
});

// diagnosis
// ตรวจสอบการเชื่อมต่อฐานข้อมูล
app.get('/BOP/data', (req, res) => {
  const sql = 'SELECT * FROM diagnosis';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
    res.json(results);
  });
});

// API สำหรับบันทึกข้อมูลลงฐานข้อมูล
app.post('/diagnosis', (req, res) => {
  const {
    patient_name, patient_id, birth_date, gender, symptoms, medical_history,
    body_temperature, blood_pressure, heart_rate, respiratory_rate, spo2,
    saline, cpr, emergency_medication, equipment, responsible_person, record_date
  } = req.body;

  if (!patient_name || !patient_id || !birth_date || !symptoms) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน' });
  }

  const sql = `INSERT INTO diagnosis 
    (patient_name, patient_id, birth_date, gender, symptoms, medical_history, 
    body_temperature, blood_pressure, heart_rate, respiratory_rate, spo2, 
    saline, cpr, emergency_medication, equipment, responsible_person, record_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    patient_name, patient_id, birth_date, gender, symptoms, medical_history,
    body_temperature, blood_pressure, heart_rate, respiratory_rate, spo2,
    saline, cpr, emergency_medication, equipment, responsible_person, record_date
  ], (err, results) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
    res.json({ success: true, id: results.insertId });
  });
})

//sigup
app.get('/BOP/data', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
    res.json(results);
  });
});
// API สำหรับบันทึกข้อมูลการสมัครสมาชิก
app.post('/signup', (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    phone
  } = req.body;

  // ตรวจสอบข้อมูลสำคัญ
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน' });
  }

  const sql = `
    INSERT INTO users 
    (username, email, password, first_name, last_name, phone) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // บันทึกข้อมูลลงฐานข้อมูล
  db.query(sql, [
    username,
    email,
    password,  // ***อย่าลืมแฮชรหัสผ่านในฝั่งเซิร์ฟเวอร์ก่อนบันทึก***
    first_name,
    last_name,
    phone
  ], (err, results) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
    res.json({ success: true, id: results.insertId });
  });
});

//login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' });
    }
    if (results.length > 0) {
      res.json({ message: 'เข้าสู่ระบบสำเร็จ!' });
    } else {
      res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

const cors = require('cors');
app.use(cors());

// เริ่มต้นการทำงานของเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

