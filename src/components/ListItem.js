import { useState, useEffect, useRef } from "react";
import DragIndicatorTwoToneIcon from "@mui/icons-material/DragIndicatorTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

function ListItem({ id, title, author, date, detail, checked, setCompile }) {
  const master = useRef(false);

  const [click, setClick] = useState(false);
  const [modal, setModal] = useState("");

  //Runs when master checkbox is clcked
  useEffect(() => {
    setClick(checked);
  }, [checked]);

  //Runs when own chkbx is clcked
  const checkChange = () => {
    setClick(!click);
  };

  //Runs when either master or own checkbx is clked
  useEffect(() => {
    if (checked !== master.current) {
      master.current = checked;
      setClick(checked);
    }

    setCompile({ id: id, chk: click });
  }, [click, checked]);

  return (
    <>
      <span
        style={{
          display: "flex",
        }}
      >
        <DragIndicatorTwoToneIcon sx={{ fontSize: 40 }} />
        <label
          className="checkbox"
          style={{ paddingTop: "13px", paddingRight: "10px" }}
        >
          <input type="checkbox" checked={click} onChange={checkChange} />
        </label>
        <div>
          <p className="title ls-4">{title}</p>
          <p className="subtitle ls-6">
            <span className="icon-text">
              <span className="icon">
                <AccountCircleIcon style={{ color: "green" }} />
              </span>
              <span>{author}</span>
            </span>
            <span className="icon-text" style={{ paddingLeft: "15px" }}>
              <span className="icon">
                <CalendarTodayIcon style={{ color: "green" }} />
              </span>
              <span> {date}</span>
            </span>
          </p>
        </div>
        <div style={{ position: "absolute", right: "0px" }}>
          <button
            className="button is-success is-outlined"
            style={{ marginRight: "15px" }}
          >
            #Sports
          </button>
          <button
            className="button is-success is-outlined"
            style={{ marginRight: "15px" }}
          >
            #Worldwide
          </button>
          <button
            className="button is-success is-outlined"
            style={{ marginRight: "50px" }}
          >
            #Local
          </button>
        </div>
      </span>
      <span style={{ marginLeft: "65px" }}>
        <div
          style={{
            width: "70%",
            marginRight: "50px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
          }}
        >
          {detail}
        </div>
        <div
          style={{
            display: "inline-block",
          }}
        >
          <span className="icon-text" style={{ paddingLeft: "15px" }}>
            <span className="icon">
              <VisibilityIcon style={{ color: "blue" }} />
            </span>
            <span>
              {" "}
              <a onClick={() => setModal("is-active")}>Read Full</a>
            </span>
          </span>
        </div>
      </span>

      {/* Modals*/}
      <div className={`modal ${modal}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {" "}
          <div
            className="box"
            style={{
              paddingRight: "50px",
              paddingLeft: "50px",
              minHeight: "750px",
            }}
          >
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <button
                    style={{ position: "absolute", right: "20px" }}
                    className="button is-small"
                    aria-label="close"
                    onClick={() => setModal("")}
                  >
                    <CloseTwoToneIcon />
                  </button>
                  <p>
                    <strong className="title ls-4">{title}</strong>
                  </p>
                  <p>
                    {author} | {date}
                    <br />{" "}
                  </p>
                  <div
                    className="box"
                    style={{
                      minHeight: "500px",
                      marginTop: "20px",
                      marginBottom: "30px",
                      borderStyle: "dashed",
                      borderColor: "gray",
                    }}
                  >
                    {detail}
                  </div>
                </div>
                <nav className="level">
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fa fa-reply"></i>
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fa fa-retweet"></i>
                      </span>
                    </a>{" "}
                    <button
                      className="button is-success"
                      style={{ marginRight: "15px", marginLeft: "140px" }}
                    >
                      Publish
                    </button>
                    <button
                      className="button is-danger"
                      style={{ marginRight: "15px" }}
                    >
                      Delete
                    </button>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
export default ListItem;
