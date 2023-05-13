import { QueryTypes } from 'sequelize';
import Post from '../db/models/post';
import Comment from '../db/models/comments';
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

    public static async createNewCommentForPost(user_id: number, post_id: number, text: string){
        return Comment.create({
            user_id,
            post_id,
            text
        })
    }

    public static async createNewPost(userId: number, cityId: number, title: string){
        return Post.create({
            user_id: userId,
            title: title,
            city_id: cityId
        })
    }
}



export default CommentService