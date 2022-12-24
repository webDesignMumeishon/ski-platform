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
        (1, 'Title for post 1', 1, NOW(), NOW());
    `)
  },

  comments: async () => {
    await sequelize.query(`
      INSERT INTO 
        comments("user_id", "post_id", "comment", "created_at", "updated_at") 
      VALUES 
        (1, 1, 'testing comment from user 1', NOW(), NOW()),
        (2, 1, 'testing comment from user 2', NOW(), NOW());
    `)
  }
}


export default insertDb