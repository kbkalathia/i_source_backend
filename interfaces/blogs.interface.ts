export interface BlogDetails {
  id: number;
  title: string;
  short_description: string;
  description: string;
  author: string;
  authorImage?: string;
  blogImage: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
