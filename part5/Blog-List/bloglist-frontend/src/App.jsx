import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Success from "./components/Success";
import Error from "./components/Error";
import Togglable from "./components/Togglable";

import BlogFrom from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // fetch blogs on mount
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // check if user already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON);
        if (user) {
          setUser(user);
          blogService.setToken(user.token);
        }
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
        window.localStorage.removeItem("loggedBlogAppUser");
      }
    }
  }, []);

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
  };

  // handle new blog post
  const handlePost = async (e) => {
    e.preventDefault();
    const post = { title, author, url };

    try {
      const returnedPost = await blogService.create(post);
      setBlogs(blogs.concat(returnedPost));

      const newTitle = title;
      const newAuthor = author;

      setTitle("");
      setAuthor("");
      setUrl("");

      setSuccessMessage(`A new blog "${newTitle}" by ${newAuthor} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // login form
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  // handle Like 

    const handleLike = async (blog) => {
     
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      
    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs(
      blogs
          .map(b => b.id === blog.id ? returnedBlog : b)
          .sort((a, b) => b.likes - a.likes)
    )
    }
    catch(error){
      console.log(error)
    }
  }

  // handleDelete 
const handleDelete = async (blog) => {

  window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
  try {
    await blogService.deleteblog(blog.id)  
    setBlogs(blogs.filter(b => b.id !== blog.id))  
  } catch (err) {
    console.log(err)
  }
}


  // blog post form
  return (
    <div>

      {errorMessage && <Error message={errorMessage} />}
      {successMessage && <Success message={successMessage} />}

      {!user && (
        <div>
          <h1>Log in to Application</h1>
          {loginForm()}
        </div>
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>

          <Togglable buttonLabel="Create new Blog" secondButtonLabel = "Cancel">
            <BlogFrom
              handlePost={handlePost}
              title={title}
              author={author}
              url={url}
              handleTitleChange={(e) => setTitle(e.target.value)}
              handleAuthorChange={(e) => setAuthor(e.target.value)}
              handleUrlChange={(e) => setUrl(e.target.value)}
            />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.map((blog,i) => (
       <Blog key={blog.id || i}  blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>

      ))}


    </div>)}

    </div>
)};

export default App;