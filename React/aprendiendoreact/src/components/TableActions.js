import React from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

function TableActions({ edit, rowId }) {
  return (
    <div>
      {edit ? (
        <Link to={`${edit.url}${rowId}`}>
          <BsFillPencilFill />
        </Link>
      ) : null}
    </div>
  );
}
export default TableActions;
