import { Op } from "sequelize";
import BlogsModel from "../models/blogs.model";
import CommentsModel from "../models/comments.model";

export const getAllBlogs = async (
  page: number = 1,
  limit: number = 10,
  searchQuery = null
) => {
  try {
    const offset = (page - 1) * limit;

    const whereCondition = searchQuery
      ? {
          [Op.or]: {
            title: {
              [Op.iLike]: `%${searchQuery}%`,
            },
            short_description: {
              [Op.iLike]: `%${searchQuery}%`,
            },
            description: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
        }
      : {};

    const { rows: blogs, count } = await BlogsModel.findAndCountAll({
      limit,
      offset,
      where: whereCondition,
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
    return await BlogsModel.findByPk(id, {
      include: [
        {
          model: CommentsModel,
          as: "allComments",
        },
      ],
    });
  } catch (error) {
    throw new Error("Failed to fetch blog: " + error);
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
  return { message: "Blog deleted successfully" };
};
