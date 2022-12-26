import sequelize from '../db'


const insertDb = {
   users: async () => {
    await sequelize.query(`
      INSERT INTO 
        users("first_name", "last_name", "email", "password", "created_at", "updated_at") 
      VALUES 
        ('Martin', 'Macchi', 'martin@mail.com', '123456' ,NOW(), NOW()),
        ('Tomas', 'Macchi', 'tomas@mail.com', '$2b$10$MtLN1upRHQH8iBqecDkQB.gxQJNl3udEabagBvsg1W6GbC8GCEmQ2', NOW(), NOW()),
        ('Lucas', 'Macchi', 'lucas@mail.com', '123456', NOW(), NOW());
    `)
  },

  cities: async () => {
    await sequelize.query(`
      INSERT INTO 
        cities("city", "state", "country", "postcode", "created_at", "updated_at") 
      VALUES 
        ('Breckenridge', 'Colorado', 'United States','80424', NOW(), NOW());
    `)
  },

  posts: async () => {
    await sequelize.query(`
      INSERT INTO 
        posts("user_id", "title", "city_id", "created_at", "updated_at") 
      VALUES 
        (1, 'This is a post created by Martin Macchi', 1, NOW(), NOW()),
        (2, 'This is a post created by Tomas Macchi', 1, NOW(), NOW());
    `)
  },

  comments: async () => {
    await sequelize.query(`
      INSERT INTO 
        comments("user_id", "post_id","parent", "text", "created_at", "updated_at") 
      VALUES 

        (1, 1, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada egestas tortor facilisis ullamcorper. 
        Duis pharetra massa id tristique vulputate. Praesent ex tellus, ullamcorper nec sem in, tempus sollicitudin felis. 
        Cras dignissim erat id enim aliquam ornare. Maecenas varius odio a erat lacinia, sit amet lacinia nibh varius. Vivamus ut ligula vehicula, 
        bibendum leo vel, tempor nulla. Proin id vestibulum ipsum. Aliquam ut sapien turpis. Sed mauris arcu, euismod vel ante non, vehicula faucibus diam. 
        Praesent tincidunt feugiat blandit. In blandit nisi id erat tincidunt facilisis. Aenean bibendum, ante sit amet tincidunt volutpat, elit mauris rhoncus odio,
        quis hendrerit nisl tortor in enim. Pellentesque sit amet augue at sem congue accumsan ut id lacus. 
        Suspendisse eget risus et ante porta imperdiet eu ac elit. In viverra, magna vitae consequat fringilla, velit lacus dignissim massa, 
        vel rutrum neque turpis a est. Maecenas facilisis enim nec cursus placerat.', 
        (NOW() - INTERVAL '1 HOUR'), (NOW() - INTERVAL '1 HOUR')),

        (2, 1, null, '
        Phasellus egestas turpis eget nulla luctus, non mollis purus accumsan. Vestibulum maximus malesuada rhoncus. In commodo, ipsum at volutpat mollis, 
        orci tortor ullamcorper nulla, non ornare urna velit ut metus. Vivamus quis dignissim felis. Pellentesque in odio a odio placerat feugiat congue quis nunc. 
        Curabitur gravida, justo ac molestie rutrum, risus nisi vulputate est, ac tempor justo ipsum eu tortor. Quisque tincidunt leo eget aliquet sodales. 
        Suspendisse ac metus ut sem tempus ultricies in vel sem.
        ', NOW(), NOW()),

        (1, 1, 2, 'Sed eget augue nec mauris ultrices tincidunt id et purus. Integer consectetur condimentum risus sed fringilla. Etiam ut pretium ante. 
        Praesent pretium laoreet justo vel luctus. Etiam ullamcorper arcu lacus, quis scelerisque quam malesuada eget. Aliquam sagittis est vitae euismod ultricies.', 
        (NOW() + INTERVAL '1 HOUR'), (NOW() + INTERVAL '1 HOUR')),

        (1, 1, 2, 'Sed eget augue nec mauris ultrices tincidunt id et purus. Integer consectetur condimentum risus sed fringilla. Etiam ut pretium ante. 
        Praesent pretium laoreet justo vel luctus. Etiam ullamcorper arcu lacus, quis scelerisque quam malesuada eget. Aliquam sagittis est vitae euismod ultricies.', 
        (NOW() + INTERVAL '1 HOUR'), (NOW() + INTERVAL '1 HOUR'));
    `)
  },

  likes: async () => {
    await sequelize.query(`
      INSERT INTO 
        likes("user_id", "post_id", "created_at", "updated_at") 
      VALUES 
        (1, 1, NOW(), NOW()),
        (2, 1, NOW(), NOW()),
        (3, 1, NOW(), NOW()),
        (3, 2, NOW(), NOW());
    `)
  },
}


export default insertDb