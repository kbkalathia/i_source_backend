import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import CommentsModel from "./comments.model";

const BlogsModel = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Associations
BlogsModel.hasMany(CommentsModel, { foreignKey: "blog_id", as: "allComments" });
CommentsModel.belongsTo(BlogsModel, {
  foreignKey: "blog_id",
  as: "blogDetails",
});

export default BlogsModel;
