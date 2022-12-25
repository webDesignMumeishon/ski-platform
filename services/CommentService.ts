import { QueryTypes } from 'sequelize';

import sequelize from '../db/db'



class CommentService {

    public static async getCommentsFromPost(postId: number){
        const result = await sequelize.query(`
            SELECT p.id as post_id, p.title, c.id, c.parent, c.text, c.created_at, u.first_name, u.last_name FROM posts p
            JOIN comments c ON c.post_id = p.id
            JOIN users u ON u.id = c.user_id
            WHERE p.id = :postId
            ORDER BY c.created_at ASC
        `,
        {
            replacements: { postId: postId },
            type: QueryTypes.SELECT
        }
        )
        return result
    }


}



export default CommentService