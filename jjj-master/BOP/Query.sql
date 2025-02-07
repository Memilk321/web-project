#const db = mysql.createConnection({
#  host: 'localhost',   
#  user: 'root',        
#  password: '',        
#  database: 'mydb'     
#});

#CREATE TABLE users (
#    id INT PRIMARY KEY AUTO_INCREMENT,
#    username VARCHAR(50) NOT NULL,
#    email VARCHAR(100) NOT NULL UNIQUE,
#    password VARCHAR(255) NOT NULL,
#    first_name VARCHAR(50),
#    last_name VARCHAR(50),
#    phone VARCHAR(20),
#    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#);

#CREATE TABLE diagnosis (
#    id INT PRIMARY KEY AUTO_INCREMENT,
#    patient_name VARCHAR(255),
#    patient_id VARCHAR(50),
#    birth_date DATE,
#   gender ENUM('male', 'female'),
#   symptoms TEXT,
#    medical_history TEXT,
#    body_temperature FLOAT,
#    blood_pressure VARCHAR(20),
#    heart_rate INT,
#    respiratory_rate INT,
#    spo2 INT,
#    saline TINYINT(1),
#    cpr TINYINT(1),
#    emergency_medication TEXT,
#    equipment TEXT,
#    responsible_person VARCHAR(255),
#    record_date DATE
#);

#CREATE TABLE emergency_patients (
#    id INT AUTO_INCREMENT PRIMARY KEY,
#    date DATE,
#    prefix VARCHAR(10),
#    fname VARCHAR(50),
#    lname VARCHAR(50),
#    gender VARCHAR(10),
#    age INT,
#    record_id VARCHAR(20),
#    id_card VARCHAR(20),
#    nationality VARCHAR(30),
#    insurance_id VARCHAR(30),
#    health_insurance VARCHAR(30),
#    address TEXT,
#    phone VARCHAR(15),
#    symptoms TEXT,
#    allergy TEXT,
#    medication TEXT,
#    disease_history TEXT,
#    last_meal TEXT,
#    emergency_event TEXT,
#    emergency_level VARCHAR(20),
#    interviewer_prefix VARCHAR(10),
#    interviewer_fname VARCHAR(50),
#    interviewer_lname VARCHAR(50)
#) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

#CREATE TABLE referrals (
#    id INT AUTO_INCREMENT PRIMARY KEY,
#    date DATE,
#    hospital VARCHAR(255),
#    hospital_address TEXT,
#    hospital_phone VARCHAR(20),
#    patient_name VARCHAR(50),
#    patient_id VARCHAR(50),
#    gender ENUM('male', 'female'),
#    age INT,
#    dob DATE,
#    patient_address TEXT,
#    patient_phone VARCHAR(20),
#    chief_complaint TEXT,
#    preliminary_diagnosis TEXT,
#    drug_allergy TEXT,
#    previous_treatment TEXT,
#    referral_reason ENUM('specialist', 'emergency', 'further_investigation', 'other'),
#    referral_hospital VARCHAR(255),
#    referral_department VARCHAR(255),
#    referral_phone VARCHAR(20),
#    transport_method ENUM('ambulance', 'private_vehicle', 'public_transport', 'other'),
#    equipment_used TEXT,
#    accompanying_person TEXT,
#    attached_document TEXT,
 #   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
