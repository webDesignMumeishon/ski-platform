import { QueryTypes } from 'sequelize';

import sequelize from '../db/db'

class PostService {

    public static async getPostsAndCount(userId : string){
        const result = await sequelize.query(`
        SELECT 
        p.id, 
        p.title, 
        p.created_at, 
        p.user_id,
        u.first_name, 
        u.last_name, 
        COUNT(c.post_id) as number_comments,
        (
            SELECT COUNT(l.id) as number_likes from likes l
            WHERE l.post_id = p.id
            GROUP BY l.post_id
        ),
        (
            SELECT
            CASE 
                WHEN l.post_id = p.id AND l.user_id = :userId THEN 1
                ELSE 0
            END as did_like
            FROM likes l 
            WHERE l.post_id = p.id AND l.user_id = :userId
            GROUP BY l.id
        )
        FROM posts p
        LEFT JOIN comments c ON c.post_id = p.id
        LEFT JOIN users u ON p.user_id = u.id
        GROUP BY p.id, c.post_id, u.first_name, u.last_name
        ORDER BY p.created_at DESC;
        `,
        {
            replacements: {userId},
            type: QueryTypes.SELECT
        }
        )
        return result
    }
}


export default PostService



