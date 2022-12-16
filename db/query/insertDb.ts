import sequelize from '../db'

const insertDb = async (insert : boolean = true) => {

    if(insert){
        await sequelize.query(`
        INSERT INTO 
          users("first_name", "last_name", "email", "password", "created_at", "updated_at") 
        VALUES 
          ('Martin', 'Macchi', 'martin@mail.com', '123456' ,NOW(), NOW()),
          ('Tomas', 'Macchi', 'tomas@mail.com', '$2b$10$MtLN1upRHQH8iBqecDkQB.gxQJNl3udEabagBvsg1W6GbC8GCEmQ2', NOW(), NOW()),
          ('Lucas', 'Macchi', 'lucas@mail.com', '123456', NOW(), NOW());
      `)
    }

}


export default insertDb