const BlogFrom = ({
  handlePost,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <form onSubmit={handlePost}>
        <div>
          <label>
            Title{" "}
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            Author{" "}
            <input type="text" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            URL <input type="text" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogFrom;