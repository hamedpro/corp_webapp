import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
export default function AdminDashboard() {
  const [users, set_users] = useState([]);
  function fetch_data() {
    customAjax({
      params: {
        task_name: "get_users",
      },
    }).then(
      (data) => {
        set_users(data.result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function toggle_user_admin(user_id) {
    customAjax({
      params: {
        task_name: "toggle_user_admin_state",
        id: user_id,
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
  useEffect(() => {
    fetch_data();
  }, []);
  var nav = useNavigate();
  return (
    <>
      <div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
        <h1>options:</h1>
        <hr />
        <a
          className="block"
          onClick={(e) => {
            e.preventDefault();
            nav("/admin-dashboard/update_company_data");
          }}
        >
          set company_data
        </a>
        <a
          className="block"
          onClick={(e) => {
            e.preventDefault();
            alert(
              "you will be redirected right now becuse you should do it in your own user account"
            );
            nav("/user/" + window.localStorage.getItem("username"));
          }}
        >
          change my password
        </a>
      </div>
      <div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
        <h1>users:</h1>
        <hr />
        <table className="custom_border">
          <tbody>
            <tr>
              <th>user_id</th>
              <th>username</th>
              <th>is_admin</th>
              <th>options</th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.is_admin}</td>
                  <td>
                    <p onClick={() => toggle_user_admin(user.id)}>
                      {user.is_admin == "true"
                        ? "remove admin privileges"
                        : "make the user admin "}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
