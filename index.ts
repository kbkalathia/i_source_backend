import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as BlogsController from "./controllers/blogs.controller";
import * as CommentsController from "./controllers/comments.controller";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Blog
app.get("/api/blogs-list", BlogsController.fetchBlogs);
app.get("/api/blog-details/:id", BlogsController.fetchBlogById);
app.post("/api/create-blog", BlogsController.createBlog);
app.put("/api/update-blog/:id", BlogsController.updateBlog);
app.delete("/api/delete-blog/:id", BlogsController.deleteBlog);

// Blog Comments
app.get("/api/comments/:blogId", CommentsController.fetchComments);
app.get(
  "/api/comments/commentDetails/:commentId",
  CommentsController.fetchCommentDetails
);
app.post("/api/comments/:blogId", CommentsController.addComment);
app.put("/api/comments/:commentId", CommentsController.editComment);
app.delete("/api/comments/:commentId", CommentsController.deleteComment);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
