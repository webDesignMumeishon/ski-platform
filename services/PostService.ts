import { QueryTypes } from 'sequelize';

import sequelize from '../db/db'

class PostService {

    public static async getPostsAndCount(){
        const result = await sequelize.query(`
            SELECT p.id, p.title, p.created_at, u.first_name, u.last_name, COUNT(p.id) from posts p
            LEFT JOIN comments c ON c.post_id = p.id
            JOIN users u ON p.user_id = u.id
            GROUP BY p.id, u.first_name, u.last_name
            ORDER BY p.created_at DESC;
        `,
        {
            replacements: {},
            type: QueryTypes.SELECT
        }
        )
        return result
    }
}


export default PostService