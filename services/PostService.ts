import { QueryTypes } from "sequelize";
import sequelize from "../db/db";

interface PostAndCount {
  id: number;
  title: string;
  created_at: Date;
  user_id: number;
  first_name: string;
  last_name: string;
  number_comments: string;
  number_likes: string;
  did_like: null | string;
}

type PostAndCountPublic = Omit<PostAndCount, "did_like">;

class PostService {
  private static async getPostsAndCountLogged(
    userId: string,
    town: string,
    state: string
  ): Promise<PostAndCount[]> {
    return sequelize.query<PostAndCount>(
      `
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
        LEFT JOIN cities ON cities.id = p.city_id
        WHERE cities.city = :town
            AND cities.state = :state
        GROUP BY p.id, c.post_id, u.first_name, u.last_name
        ORDER BY p.created_at DESC;
        `,
      {
        replacements: { userId, town, state },
        type: QueryTypes.SELECT,
      }
    );
  }

  public static async getPostsAndCount(
    town: string,
    state: string,
    userId?: string
  ): Promise<PostAndCount[]> {
    if (userId === undefined) {
      return PostService.getPublicPostsAndCount(town, state);
    } else {
      return PostService.getPostsAndCountLogged(userId, town, state);
    }
  }

  private static async getPublicPostsAndCount(
    town: string,
    state: string
  ): Promise<PostAndCount[]> {
    const result = await sequelize.query<PostAndCountPublic>(
      `
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
        )
        FROM posts p
        LEFT JOIN comments c ON c.post_id = p.id
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN cities ON cities.id = p.city_id
        WHERE cities.city = :town
            AND cities.state = :state
        GROUP BY p.id, c.post_id, u.first_name, u.last_name
        ORDER BY p.created_at DESC;
        `,
      {
        replacements: { town, state },
        type: QueryTypes.SELECT,
      }
    );

    const posts = result.map((row) => {
      return {
        ...row,
        did_like: null,
      };
    });

    return posts;
  }

  public static async getSinglePost(postId: string) {
    return sequelize.query(
      `
        SELECT p.id as post_id, p.title as title, p.created_at, u.first_name, u.last_name FROM posts p
        JOIN users u ON u.id = p.user_id
        WHERE p.id = :postId
        `,
      {
        replacements: { postId: postId },
        type: QueryTypes.SELECT,
      }
    );
  }

  public static async getLikesFromPost(
    postId: string
  ): Promise<{ count: string }[]> {
    return sequelize.query<{ count: string }>(
      `
        SELECT COUNT(*) from likes WHERE post_id = :postId
        `,
      {
        replacements: { postId: postId },
        type: QueryTypes.SELECT,
      }
    );
  }
}

export default PostService;
