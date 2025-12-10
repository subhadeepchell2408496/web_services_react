import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";

const AxiosApi = () => {
  const [viewData, setViewData] = useState({ items: [], isDataLoaded: false });

  const fetchData = () => {
    // dont use the api url here.
    UserService.getUsers().then((values) =>
        setViewData({
          items: values.data,
          isDataLoaded: true,
        })
      ).catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSet = viewData.items.map((element) => {
    return (
      <li key={element.id}>
        User_Name: {element.username}, Full_Name: {element.name}, User_Email: {element.email}
      </li>
    );
  });

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

export default AxiosApi;
