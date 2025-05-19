import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  // console.log(blogs[0].content)
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" w-xl">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
