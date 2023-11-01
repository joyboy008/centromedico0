import React from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

function TableActions({ edit, rowId, customActions = [] }) {
  return (
    <div className="d-flex justify-content-around">
      {edit ? (
        <Link to={`${edit.url}${rowId}`}>
          <BsFillPencilFill />
        </Link>
      ) : null}
      {customActions.map((customAction) => {
        let url = customAction.url;
        let suffix = customAction.urlSuffix;
        if (!!suffix) {
          url = `${url}${rowId}${suffix}`;
        } else {
          url = `${url}${rowId}`;
        }
        return <Link to={url}>{customAction.icon}</Link>;
      })}
    </div>
  );
}
export default TableActions;
