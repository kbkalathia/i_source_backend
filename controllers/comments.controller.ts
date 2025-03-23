import { HttpStatusCode } from "axios";
import * as CommentService from "../services/comments.service";
import { AddCommentsPayload } from "../interfaces/comments.interface";

export const fetchComments = async (req: any, res: any) => {
  try {
    const blogId = parseInt(req.params.blogId);

    const data = await CommentService.getCommentsForBlog(blogId);
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error fetching comments: " + error });
  }
};

export const fetchCommentDetails = async (req: any, res: any) => {
  try {
    const commentId = parseInt(req.params.commentId);

    const data = await CommentService.getCommentDetails(commentId);
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error fetching comment details: " + error });
  }
};

export const addComment = async (req: any, res: any) => {
  try {
    const blogId = parseInt(req.params.blogId);
    const commentsPayload: AddCommentsPayload = req.body;

    const data = await CommentService.addCommentForBlog(
      blogId,
      commentsPayload
    );
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error adding comment: " + error });
  }
};

export const editComment = async (req: any, res: any) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const commentsPayload: AddCommentsPayload = req.body;

    const data = await CommentService.editCommentForBlog(
      commentId,
      commentsPayload
    );
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error editing comment: " + error });
  }
};

export const deleteComment = async (req: any, res: any) => {
  try {
    const commentId = parseInt(req.params.commentId);

    const data = await CommentService.deleteCommentFromBlog(commentId);
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error deleting comment: " + error });
  }
};
