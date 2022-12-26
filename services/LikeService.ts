import Likes from '../db/models/likes';

class LikeService {

    public static async likePost(userId: number, postId: number) : Promise<Likes>{
        const result = await Likes.create({
            user_id: userId,
            post_id: postId
        })
        return result
    }

}


export default LikeService