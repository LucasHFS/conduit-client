const TagList = ({ tags }) => {
  return (
    <>
      {!!tags.length && (
        <div className="tags-container">
          <ul className="tag-list" id="tag-list">
            {tags.map((tag) => (
              <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default TagList
