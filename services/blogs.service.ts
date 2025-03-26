import { Op } from "sequelize";
import BlogsModel from "../models/blogs.model";
import CommentsModel from "../models/comments.model";
import { Messages } from "../utils/messages";

class BlogServiceClass {
  async getAllBlogs(page: number = 1, limit: number = 10, searchQuery = null) {
    const offset = (page - 1) * limit;

    const whereCondition = searchQuery
      ? {
          [Op.or]: {
            title: { [Op.iLike]: `%${searchQuery}%` },
            short_description: { [Op.iLike]: `%${searchQuery}%` },
            description: { [Op.iLike]: `%${searchQuery}%` },
          },
        }
      : {};

    const { rows: blogs, count } = await BlogsModel.findAndCountAll({
      limit,
      offset,
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    });

    return {
      blogs,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getBlogById(id: number) {
    return await BlogsModel.findByPk(id, {
      include: [{ model: CommentsModel, as: "allComments" }],
    });
  }

  async createBlog(blogData: Record<string, any>) {
    return await BlogsModel.create(blogData);
  }

  async updateBlog(id: number, updatedData: Record<string, any>) {
    const [updatedRows, updatedBlogs] = await BlogsModel.update(updatedData, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new Error(Messages.Blogs.NOT_FOUND);
    }

    return updatedBlogs[0];
  }

  async deleteBlog(id: number) {
    const blog = await BlogsModel.findByPk(id);
    if (!blog) {
      throw new Error(Messages.Blogs.NOT_FOUND);
    }

    return await blog.destroy();
  }
}

const BlogService = new BlogServiceClass();
export default BlogService;
