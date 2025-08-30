import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, handleLike ,handleDelete}) => {
  const [visible, setVisible] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide': 'view'}
      </button>

      {visible && (
        <div className="blogDetails">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={()=>handleLike(blog)}>likes</button>
          </p>
          <p>{blog.user?.name || 'unknown user'}</p>
          <button
          style={{

            borderRadius:'5px',
            backgroundColor: 'crimson'
            

          }}

    onClick={()=>handleDelete(blog)}
          >remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
