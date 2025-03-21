import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as BlogsController from "./controllers/blogs.controller";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/blogs-list", BlogsController.fetchBlogs);
app.get("/api/blog-details/:id", BlogsController.fetchBlogById);
app.get("/api/search-blog", BlogsController.searchBlog);
app.post("/api/create-blog", BlogsController.createBlog);
app.put("/api/update-blog/:id", BlogsController.updateBlog);
app.delete("/api/delete-blog/:id", BlogsController.deleteBlog);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
