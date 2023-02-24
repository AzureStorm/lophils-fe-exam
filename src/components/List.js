import { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import MockData from "./MOCK_DATA.json";

function List() {
  const [checked, setChecked] = useState(false);
  const [compile, setCompile] = useState({ id: 1, chk: false });
  const [filter, setFilter] = useState(false);

  const viewData = useRef(MockData);
  const dataArr = useRef(MockData);

  //When child chkbx is changed
  useEffect(() => {
    dataArr.current[compile.id - 1].chk = compile.chk;
  }, [compile]);
  let val = checked;

  //When master chkbx is changed
  useEffect(() => {
    dataArr.current.map((data) => {
      data.chk = checked;
    });
  }, [checked]);

  const onDeleteClick = () => {
    viewData.current = dataArr.current.filter((entry) => {
      return entry.chk === false;
    });
    setFilter(!filter);
  };

  //Calling ListItems
  const renderedData = viewData.current.map((data) => {
    return (
      <li key={data.id} className="content box has-background-white-ter">
        <ListItem
          id={data.id}
          title={data.title}
          author={data.author}
          date={data.data}
          detail={data.content}
          checked={val}
          setCompile={setCompile}
        />
      </li>
    );
  });

  //Output
  return (
    <div style={{ margin: "30px" }}>
      <p className="title ls-4">News Articles</p>
      <label
        className="checkbox"
        style={{ paddingTop: "13px", paddingRight: "10px" }}
      >
        <input type="checkbox" onClick={() => setChecked(!checked)} />
      </label>
      <button
        className="button is-info is-outlined"
        style={{ marginRight: "15px" }}
      >
        Publish
      </button>
      <button
        className="button is-danger is-outlined"
        style={{ marginRight: "15px", marginBottom: "20px" }}
        onClick={onDeleteClick}
      >
        Delete
      </button>
      <div
        className="control"
        style={{
          position: "absolute",
          right: "20px",
          marginTop: "-60px",
          width: "20%",
        }}
      >
        <input className="input" type="text" placeholder="Search..." />
      </div>
      <ul>{renderedData}</ul>
    </div>
  );
}
export default List;
