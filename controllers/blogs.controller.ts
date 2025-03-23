import { HttpStatusCode } from "axios";
import * as BlogService from "../services/blogs.service";

export const fetchBlogs = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchQuery = req.query.search || null;

    const data = await BlogService.getAllBlogs(page, limit, searchQuery);
    res.status(HttpStatusCode.Ok).json(data);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error fetching blogs: " + error });
  }
};

export const fetchBlogById = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ error: "Invalid blog ID" });
    }

    const blog = await BlogService.getBlogById(id);
    if (!blog) {
      return res
        .status(HttpStatusCode.NotFound)
        .json({ error: "Blog not found" });
    }

    res.status(HttpStatusCode.Ok).json(blog);
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Error fetching blog: " + error });
  }
};

export const createBlog = async (req: any, res: any) => {
  try {
    const newBlog = await BlogService.createBlog(req.body);
    return res.status(201).json(newBlog);
  } catch (error: any) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: error.message });
  }
};

export const updateBlog = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogService.updateBlog(parseInt(id), req.body);
    return res.status(HttpStatusCode.Ok).json(updatedBlog);
  } catch (error: any) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: error.message });
  }
};

export const deleteBlog = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await BlogService.deleteBlog(parseInt(id));
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: error.message });
  }
};
