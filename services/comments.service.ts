import { AddCommentsPayload } from "../interfaces/comments.interface";
import CommentsModel from "../models/comments.model";

export const getCommentsForBlog = async (blogId: number) => {
  try {
    const { rows: comments, count } = await CommentsModel.findAndCountAll({
      where: { blog_id: blogId },
      order: [["createdAt", "DESC"]],
    });

    return {
      comments,
      totalComments: count,
      message: "Comment for blog",
    };
  } catch (error) {
    throw new Error("Failed to fetch comment: " + error);
  }
};

export const getCommentDetails = async (commentId: number) => {
  try {
    const comments = await CommentsModel.findByPk(commentId);

    return {
      commentDetails: comments,
      message: "Comment for blog",
    };
  } catch (error) {
    throw new Error("Failed to fetch comment: " + error);
  }
};

export const addCommentForBlog = async (
  blogId: number,
  commentsPayload: AddCommentsPayload
) => {
  try {
    const res = await CommentsModel.create({
      blog_id: blogId,
      ...commentsPayload,
    });

    return { message: "Comment added successfully" };
  } catch (error) {
    throw new Error("Failed to add comment: " + error);
  }
};

export const editCommentForBlog = async (
  commentId: number,
  commentsPayload: AddCommentsPayload
) => {
  try {
    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) throw new Error("Comment not found");

    const [updatedRows, updatedComment] = await CommentsModel.update(
      commentsPayload,
      {
        where: { id: commentId },
        returning: true,
      }
    );

    return {
      comment: updatedComment[0],
      message: "Comment updated successfully",
    };
  } catch (error) {
    throw new Error("Failed to edit comment: " + error);
  }
};

export const deleteCommentFromBlog = async (commentId: number) => {
  try {
    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) throw new Error("Comment not found");

    await comment.destroy();

    return { message: "Comment deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete comment: " + error);
  }
};
