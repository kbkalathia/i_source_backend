import { Op } from "sequelize";
import BlogsModel from "../models/blogs.model";

export const getAllBlogs = async (page: number = 1, limit: number = 10) => {
  try {
    const offset = (page - 1) * limit;

    const { rows: blogs, count } = await BlogsModel.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "ASC"]],
    });

    return {
      blogs,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    throw new Error("Failed to fetch blogs list: " + error);
  }
};

export const getBlogById = async (id: number) => {
  try {
    return await BlogsModel.findByPk(id);
  } catch (error) {
    throw new Error("Failed to fetch blog: " + error);
  }
};

export const searchBlogs = async (
  query: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const { rows: blogs, count } = await BlogsModel.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { short_description: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      blogs,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    throw new Error("Failed to search blogs: " + error);
  }
};

export const createBlog = async (blogData: any) => {
  return await BlogsModel.create(blogData);
};

export const updateBlog = async (id: number, updatedData: any) => {
  const [updatedRows, updatedBlogs] = await BlogsModel.update(updatedData, {
    where: { id },
    returning: true,
  });

  if (updatedRows === 0) {
    throw new Error("Blog not found");
  }

  return updatedBlogs[0];
};

export const deleteBlog = async (id: number) => {
  const blog = await BlogsModel.findByPk(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  await blog.destroy();
};
