-- This is for when timestamps have a default value
INSERT INTO 
    users("firstName", "lastName", "email") 
VALUES 
    ('Martin', 'Macchi', 'martin@mail.com'),
    ('Tomas', 'Macchi', 'tomas@mail.com'),
    ('Lucas', 'Macchi', 'lucas@mail.com');

INSERT INTO 
    users("first_name", "last_name", "email", "created_at", "updated_at") 
VALUES 
    ('Martin', 'Macchi', 'martin@mail.com', NOW(), NOW()),
    ('Tomas', 'Macchi', 'tomas@mail.com', NOW(), NOW()),
    ('Lucas', 'Macchi', 'lucas@mail.com', NOW(), NOW());

INSERT INTO 
    users("first_name", "last_name", "email", "created_at", "updated_at") 
VALUES 
    ('Martin', 'Macchi', 'martin1@mail.com', NOW(), NOW()),
    ('Tomas', 'Macchi', 'tomas1@mail.com', NOW(), NOW()),
    ('Lucas', 'Macchi', 'lucas1@mail.com', NOW(), NOW());