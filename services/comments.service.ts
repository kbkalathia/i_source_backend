import { AddCommentsPayload } from "../interfaces/comments.interface";
import CommentsModel from "../models/comments.model";
import { Messages } from "../utils/messages";

class CommentServiceClass {
  async getCommentsForBlog(blogId: number) {
    const { rows: comments, count } = await CommentsModel.findAndCountAll({
      where: { blog_id: blogId },
      order: [["createdAt", "DESC"]],
    });

    return {
      comments,
      totalComments: count,
    };
  }

  async getCommentDetails(commentId: number) {
    return await CommentsModel.findByPk(commentId);
  }

  async addCommentForBlog(commentsPayload: AddCommentsPayload) {
    return await CommentsModel.create({ ...commentsPayload });
  }

  async editCommentForBlog(
    commentId: number,
    commentsPayload: AddCommentsPayload
  ) {
    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) throw new Error(Messages.Comments.NOT_FOUND);

    const [updatedRows, updatedComment] = await CommentsModel.update(
      commentsPayload,
      {
        where: { id: commentId },
        returning: true,
      }
    );

    return updatedComment[0];
  }

  async deleteCommentFromBlog(commentId: number) {
    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) throw new Error(Messages.Comments.NOT_FOUND);

    return await comment.destroy();
  }
}

const CommentService = new CommentServiceClass();
export default CommentService;
