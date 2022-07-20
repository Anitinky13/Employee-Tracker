
INSERT INTO  department (name)
VALUES
('Engineering'),
('Finance'),
('Sales'),
('Legal');

INSERT INTO role
(title, salary,  department_id)
VALUES
('IT Engineer', 80000, 1),
('Network Engineer', 90000, 1),
('System Engineer', 95000, 1),
('Technical Support Engineer',60000, 1),
('Equity Analyst', 100000, 2),
('Investment Banker', 150000, 2),
('Tax Director', 200000, 2),
('Vice President of Analytics', 200000, 2),
('Account Manager', 80000, 3),
('Account Executive', 100000, 3),
('Sales Director', 200000, 3),
('Legal Tech', 90000, 4),
('Trial Lawyers', 100000, 4),
('Tax Attorney', 100000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Sophie', 'Smith', 1,1),
('Katie', 'Smith', 2, NULL),
('Chase', 'Smith', 3, 1),
('Eugene', 'Smith', 4,1),
('Jason', 'Brown', 5,1),
('Timothy', 'Doe', 6, NULL),
('Seth', 'Doe', 7,2),
('Charlotte', 'Chaz', 3,2),
('Melissa', 'Arm', 8, 3),
('Zachary', 'Soap', 9, 3),
('Martin', 'Smith', 10, 4),
('Ally', 'Cole', 11, 4),
('Lia', 'Josh', 12, 4),
('John', 'Smith', 10, 4);