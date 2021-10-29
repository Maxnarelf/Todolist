import React from "react";
import PostListItem from "../post-list-item";
import "./post-list.css";

const PostList = ({
  posts,
  onDelete,
  onEdit,
  onToggleImportant,
  onTogglePerform,
  editItemId,
  editSuccess,
  editCancel,
  topScroll,
  isVisible,
}) => {
  const elements = posts.map((item) => {
    const { id, perform, important, ...itemProps } = item;

    let listClass = "list-group-item";

    if (perform) {
      listClass += " list-group-item-success perform ";
    }

    if (important) {
      listClass += " important text-danger fw-bold"; //list-group-item-warning
    }

    return (
      <li key={id} className={listClass}>
        <PostListItem
          id={id}
          isEditing={editItemId === id}
          {...itemProps}
          onDelete={() => onDelete(id)}
          onEdit={() => onEdit(id)}
          onEditSuccess={editSuccess}
          onEditCencel={editCancel}
          onToggleImportant={() => onToggleImportant(id)}
          onTogglePerform={() => onTogglePerform(id)}
        />
      </li>
    );
  });

  let btnClass = "topBtn";

  if (!isVisible) {
    btnClass += " hidden";
  } else {
    btnClass = "topBtn";
  }
  return (
    <>
      <ul className="app-list list-group">{elements}</ul>
      <button
        className={btnClass}
        onClick={topScroll}
      ></button>
    </>
  );
};

export default PostList;
