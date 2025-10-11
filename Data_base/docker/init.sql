-- Table 1: applicants
CREATE TABLE applicants (
    applicant_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    hr_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

INSERT INTO hr (first_name, last_name, email, phone) VALUES
    ('ธีรพงศ์', 'พูนขวัญ', 'mofudon@gmail.com', '0922561234'),
    ('ธีรพงศ์', 'รวงสา', 'nnnn@gmail.com', '0251234567'),
    ('นัถกมน', 'พิริยะธนรัต', 'monnie@gmail.com', '032123578');

INSERT INTO applicants (first_name, last_name, email, phone) VALUES
    ('สมชาย', 'รวยน้อย', 'somchai@gmail.com', '0922145624'),
    ('สมหญิง', 'รวยมาก', 'somyain@gmail.com', '0957464567');

INSERT INTO apply (position, file, stage) VALUES
    ('พนักงานล้างรถ', decode('U29tZSBkYXRh', 'base64'), 'รอพิจารณา'),
    ('พนักงานล้างรถ', decode('U29tZSBvdGhlciBkYXRh', 'base64'), 'รอพิจารณา');
