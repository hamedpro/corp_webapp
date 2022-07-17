import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
//import global_context from "../../global_context";
export default function Login() {
  var navigate = useNavigate();
  //var context = useContext(global_context);
  function login(username, password) {
    customAjax({
      params: {
        task_name: "verify_user_password",
        username,
        password,
      },
      parse_json: true,
    }).then(
      (data) => {
        if (data.result) {
          alert("auth was performed");
          // context.set_context_data({ username }); // todo take care to not override existing data in context data state in app.jsx
          navigate("/");
        } else {
          alert("username or password was incorrect please try again");
        }
      },
      (error) => {
        alert(
          "something went wrong while requesting data => more details in dev console"
        );
        console.log(error);
      }
    );
  }
  return (
    <>
      <h1>login page</h1>
      <hr />
      <p>username:</p>
      <input id="username_input" />
      <p>password:</p>
      <input id="password_input" />

      <button
        onClick={() => {
          login(
            document.getElementById("username_input").value,
            document.getElementById("password_input").value
          );
        }}
        id="login_button"
      >
        login
      </button>
    </>
  );
}
