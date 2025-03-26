import { HttpStatusCode } from "axios";
import BlogService from "../services/blogs.service";
import { Messages } from "../utils/messages";
import { SendResponse } from "../utils/helpers";

class BlogsControllerClass {
  async fetchBlogs(req: any, res: any) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const searchQuery = req.query.search || null;

      const data = await BlogService.getAllBlogs(page, limit, searchQuery);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Blogs.LIST,
        data,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching blogs list: " + error.message,
      });
    }
  }

  async fetchBlogById(req: any, res: any) {
    try {
      const blogId = parseInt(req.params.id);
      if (!blogId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Blogs.INVALID_ID,
        });
      }

      const blog = await BlogService.getBlogById(blogId);
      if (!blog) {
        return SendResponse({
          res,
          status: HttpStatusCode.NotFound,
          message: Messages.Blogs.NOT_FOUND,
        });
      }

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: Messages.Blogs.DETAILS,
        data: blog,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error fetching blog details: " + error.message,
      });
    }
  }

  async createBlog(req: any, res: any) {
    try {
      const newBlog = await BlogService.createBlog(req.body);
      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        data: newBlog,
        message: Messages.Blogs.CREATE_SUCCESS,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error creating blog: " + error.message,
      });
    }
  }

  async updateBlog(req: any, res: any) {
    try {
      const blogId = parseInt(req.params.id);
      if (!blogId) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Blogs.INVALID_ID,
        });
      }

      const updatedBlog = await BlogService.updateBlog(blogId, req.body);

      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        data: updatedBlog,
        message: Messages.Blogs.UPDATE_SUCCESS,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error updating blog: " + error.message,
      });
    }
  }

  async deleteBlog(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return SendResponse({
          res,
          status: HttpStatusCode.BadRequest,
          message: Messages.Blogs.INVALID_ID,
        });
      }

      await BlogService.deleteBlog(id);

      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        message: Messages.Blogs.DELETE_SUCCESS,
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error deleting blog: " + error.message,
      });
    }
  }
}

const BlogsController = new BlogsControllerClass();
export default BlogsController;
