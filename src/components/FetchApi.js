import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Errors } from "./Errors";
const WebApi = () => {
  const [viewData, setViewData] = useState({ items: [], isDataLoaded: false });
  const navigate = useNavigate();
  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) =>
        setViewData({
          items: json,
          isDataLoaded: true,
        })
      ).catch((err)=>{console.log(err); navigate("/errors")});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSet = viewData.items
  ? viewData.items.map((element) => (
      <li key={element.id}>
        User_Name: {element.username}, Full_Name: {element.name}, User_Email: {element.email}
      </li>
    ))
  : <div></div>;


  return (
    <div>
      {!viewData.isDataLoaded && (
        <div>
          <h1>Wait Data is Loading ...</h1>
        </div>
      )}
      {viewData.isDataLoaded && <ol>{dataSet}</ol>}
    </div>
  );
};

export default WebApi;
