import { HttpStatusCode } from "axios";
import { AddCommentsPayload } from "../interfaces/comments.interface";
import CommentService from "../services/comments.service";
import { Messages } from "../utils/messages";
import { SendResponse } from "../utils/helpers";

class CommentControllerClass {
  async fetchComments(req: any, res: any) {
    try {
      const blogId = parseInt(req.params.blogId);
      if (!blogId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Blogs.INVALID_ID,
        });
      }

      const comments = await CommentService.getCommentsForBlog(blogId);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Comments.LIST,
        data: comments,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching comments list: " + error.message,
      });
    }
  }
  
  async fetchCommentDetails(req: any, res: any) {
    try {
      const commentId = parseInt(req.params.commentId);
      if (!commentId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Comments.INVALID_ID,
        });
      }

      const comment = await CommentService.getCommentDetails(commentId);
      if (!comment) {
        return SendResponse({
          res,
          status: HttpStatusCode.NotFound,
          message: Messages.Comments.NOT_FOUND,
        });
      }

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Comments.DETAILS,
        data: comment,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching comment details: " + error.message,
      });
    }
  }

  async addComment(req: any, res: any) {
    try {
      const blogId = parseInt(req.params.blogId);
      if (!blogId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Blogs.INVALID_ID,
        });
      }

      const commentsPayload: AddCommentsPayload = req.body;
      commentsPayload.blog_id = blogId;

      const data = await CommentService.addCommentForBlog(commentsPayload);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Comments.CREATE_SUCCESS,
        data,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error adding comment: " + error.message,
      });
    }
  }

  async editComment(req: any, res: any) {
    try {
      const commentId = parseInt(req.params.commentId);
      if (!commentId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Comments.INVALID_ID,
        });
      }

      const commentsPayload: AddCommentsPayload = req.body;

      const data = await CommentService.editCommentForBlog(
        commentId,
        commentsPayload
      );

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Comments.UPDATE_SUCCESS,
        data,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error editing comment: " + error.message,
      });
    }
  }

  async deleteComment(req: any, res: any) {
    try {
      const commentId = parseInt(req.params.commentId);
      if (!commentId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Comments.INVALID_ID,
        });
      }

      await CommentService.deleteCommentFromBlog(commentId);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Comments.DELETE_SUCCESS,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error deleting comment: " + error.message,
      });
    }
  }
}

const CommentsController = new CommentControllerClass();
export default CommentsController;
