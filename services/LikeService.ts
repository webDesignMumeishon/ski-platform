import Likes from '../db/models/likes';

class LikeService {

    public static async likePost(userId: number, postId: number) : Promise<Likes>{
        return await Likes.create({
            user_id: userId,
            post_id: postId
        })
    }

    public static async unlikePost(userId : number, postId: number) : Promise<number>{

        return await Likes.destroy({
            where: {
                user_id: userId,
                post_id: postId
            },
            force: true
        })
    }

}


export default LikeService