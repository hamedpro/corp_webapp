import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
export default function User() {
  var username = useParams().username;
  const [user, set_user] = useState({
    id: "loading...",
    username: "loading...",
    is_admin: "loading...",
  });
  function change_password() {
    var old_password = prompt("enter your old password:");
    var new_password = prompt("enter your new password: ");
    customAjax({
      params: {
        task_name: "change_password",
        username: window.localStorage.getItem("username"),
        old_password,
        new_password,
      },
    })
      .then(
        (data) => {
          if (data.result) {
            alert("done");
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        fetch_data();
      });
  }
  function fetch_data() {
    customAjax({
      params: {
        task_name: "get_users",
      },
    }).then(
      (data) => {
        set_user(data.result.filter((i) => i.username == username)[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    fetch_data();
  }, []);
  return (
    <>
      <div className="mx-auto border border-blue-400 rounded mt-2 p-2">
        <h1>user account</h1>
        <hr />
        <p>user_id: {user.id}</p>
        <p>username: {user.username}</p>
        <p>is_admin: {user.is_admin}</p>
      </div>
      <div className="mx-auto border border-blue-400 rounded mt-2 p-2">
        <h1>options</h1>
        <hr />
        <p onClick={change_password}>change my password</p>
      </div>
    </>
  );
}
