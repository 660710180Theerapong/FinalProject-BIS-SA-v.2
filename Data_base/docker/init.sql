-- Table: appuser
CREATE TABLE appuser (
    email           VARCHAR(255) NOT NULL PRIMARY KEY,
    password        VARCHAR(255) NOT NULL,
    role            VARCHAR(10) NOT NULL,
    islogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: applicants
CREATE TABLE applicants (
    applicant_id    SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    birth_day       DATE NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (first_name, last_name) REFERENCES blacklist(first_name, last_name) ON DELETE CASCADE,
    FOREIGN KEY (email) REFERENCES appuser(email) ON DELETE CASCADE
);

-- Table: blacklist
CREATE TABLE blacklist (
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    birth_day       DATE NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    history         varchar(500),
    PRIMARY KEY (first_name, last_name)
);

-- Table: apply
CREATE TABLE apply (
    apply_id SERIAL PRIMARY KEY,
    position VARCHAR(100) NOT NULL,
    file BYTEA,
    stage VARCHAR(50) DEFAULT 'สมัครแล้ว',
    applicant_id INT NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: hr
CREATE TABLE hr (
    hr_id           SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255),
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(10) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (email) REFERENCES appuser(email) ON DELETE CASCADE
);

-- Table: schedule
CREATE TABLE schedule (
    schedule_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    time_s VARCHAR(50) NOT NULL,
    applicant_id INT NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE
);

-- Trigger function
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_applicants_modtime
BEFORE UPDATE ON applicants
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_apply_modtime
BEFORE UPDATE ON apply
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert appusers
INSERT INTO appuser (email, password, role) VALUES
    ('monnie@gmail.com', '321', 'hr'),
    ('nnnn@gmail.com', '654', 'hr'),
    ('somchai@gmail.com', '123', 'applicant'),
    ('somyain@gmail.com', '456', 'applicant');

-- Insert blacklist (แปลงวันที่เป็น ค.ศ.)
INSERT INTO blacklist (first_name, last_name, birth_day, email, history) VALUES
    ('มานี', 'มาแล้ว', '2012-12-20','mani@gmail.com', 'ขโมย'),
    ('นายนาว', 'เล็กจัด', '1962-05-01','mainow@gmail.com', 'ขโมย'),
    ('ใบตาล', 'บ้านใหญ่', '2002-07-04','baito@gmail.com', 'ชนแล้วหนึ');

-- Insert HR
INSERT INTO hr (first_name, last_name, email, phone) VALUES
    ('ม่อน', 'รวยป่าว', 'monnie@gmail.com', '0926325624'),
    ('หนึ่ง', 'ไม้รวย', 'nnnn@gmail.com', '0957468742');

-- Insert Applicants (แปลงวันที่ + แก้วันผิด เช่น 30 ก.พ.)
INSERT INTO applicants (first_name, last_name, birth_day, email, phone) VALUES
    ('สมชาย', 'รวยน้อย', '1997-12-12', 'somchai@gmail.com', '0922145624'),
    ('สมหญิง', 'รวยมาก', '1987-02-28', 'somyain@gmail.com', '0957464567');

-- Insert Applications
INSERT INTO apply (position, file, stage, applicant_id) VALUES
    ('พนักงานล้างรถ', decode('U29tZSBkYXRh', 'base64'), 'สมัครแล้ว', 1),
    ('พนักงานบริการ', decode('U29tZSBvdGhlciBkYXRh', 'base64'), 'ผ่านสัมภาษณ์', 2);

-- Insert Schedule
INSERT INTO schedule (first_name, last_name, time_s, applicant_id) VALUES
    ('สมชาย', 'รวยน้อย', '10:00', 1),
    ('สมหญิง', 'รวยมาก', '11:30', 2);
