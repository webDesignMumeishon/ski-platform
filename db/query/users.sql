INSERT INTO 
    users("first_name", "last_name", "email", "password", "created_at", "updated_at") 
VALUES 
    ('Martin', 'Macchi', 'martin@mail.com', '123456' ,NOW(), NOW()),
    ('Tomas', 'Macchi', 'tomas@mail.com', '123456', NOW(), NOW()),
    ('Lucas', 'Macchi', 'lucas@mail.com', '123456', NOW(), NOW());

INSERT INTO 
    posts("title", "created_at", "updated_at") 
VALUES 
    ('Testing title', NOW(), NOW());

INSERT INTO 
    comments("user_id", "post_id", "comment", "created_at", "updated_at") 
VALUES 
    (1, 1, 'Testing comment', NOW(), NOW());






