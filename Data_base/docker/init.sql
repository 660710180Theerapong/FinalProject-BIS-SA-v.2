-- Table 1: applicants
CREATE TABLE applicants (
    applicant_id    SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255),
    age             int NOT NULL,
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    role            VARCHAR(10) NOT NULL,
    isLogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: apply
CREATE TABLE apply (
    apply_id SERIAL PRIMARY KEY,
    position VARCHAR(100) NOT NULL,
    file BYTEA,
    stage VARCHAR(50),
    applicant_id SERIAL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: hr
CREATE TABLE hr (
    hr_id           SERIAL PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255),
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(10) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    role            VARCHAR(10) NOT NULL,
    isLogin         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Schedule
CREATE TABLE schedule (
    schedule_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    time_s VARCHAR(50) NOT NULL,
    applicant_id SERIAL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE
);

-- Function สำหรับ update updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger สำหรับ applicants
CREATE TRIGGER update_applicants_modtime
BEFORE UPDATE ON applicants
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Trigger สำหรับ apply
CREATE TRIGGER update_apply_modtime
BEFORE UPDATE ON apply
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

INSERT INTO applicants (first_name, last_name, age, email, phone, password, role) VALUES
    ('สมชาย', 'รวยน้อย', 20, 'somchai@gmail.com', '0922145624', '123', 'applicant'),
    ('สมหญิง', 'รวยมาก', 25, 'somyain@gmail.com', '0957464567', '456', 'applicant');

INSERT INTO apply (position, file, stage) VALUES
    ('พนักงานล้างรถ', decode('U29tZSBkYXRh', 'base64'), 'รอพิจารณา'),
    ('พนักงานล้างรถ', decode('U29tZSBvdGhlciBkYXRh', 'base64'), 'รอพิจารณา');

INSERT INTO schedule (first_name, last_name, time_s) VALUES
    ('สมชาย', 'รวยน้อย', '10:00'),
    ('สมหญิง', 'รวยมาก', '11:30');

