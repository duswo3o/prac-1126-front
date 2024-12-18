import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./modal.module.css";

function FollowModal({ showModal, closeModal, follows }) {


  return (
    <div className={style.modal} id="modal" style={{ display: showModal}}>
      <div className={style.modal_body}>
        <div style={{ float: "right", cursor: "pointer" }} onClick={closeModal}>
          [X]
        </div>
        <br />
        {follows.map((follow) => (
          <Link
            to={`/${follow.nickname}`}
            key={follow.id}
            className={style.followLink}
            onClick={closeModal}
          >
            <div
              className={style.border}
            >
              <img
                className={style.profileImg}
                src={`http://127.0.0.1:8000${follow.image}`}
              />
              <div>{follow.nickname}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FollowModal;
