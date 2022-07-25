import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
export default function AdminDashboard() {
  function ProductsSection() {
    const [products, set_products] = useState([]);
    function update_products_section() {
      customAjax({
        params: {
          task_name: "get_products",
        },
      }).then(
        (data) => {
          set_products(data.result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    useEffect(() => {
      update_products_section();
    }, []);
    var modify_product = {
      name: (product_id) => {}, // we were here
      description: (product_id) => {},
      specs: (product_id) => {},
      price: (product_id) => {},
    };
    //adding fetch_data to end of each func :
    for (prop in modify_product) {
      modify_product[prop] = () => {
        modify_product[prop]();
        update_products_section();
      };
    }
    return (
      <div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
        <h1>products:</h1>
        <hr />
        <table className="cutom_border">
          <tbody>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>specs as json</th>
              <th>price</th>
            </tr>
            {products.map((product) => {
              return (
                <tr>
                  <td>{product.id}</td>
                  <td>
                    {product.name}
                    <b onClick={() => modify_product.name(product.id)}>
                      {" "}
                      (modify)
                    </b>
                  </td>
                  <td>
                    {product.description}
                    <b onClick={() => modify_product.description(product.id)}>
                      {" "}
                      (modify)
                    </b>
                  </td>
                  <td>
                    {product.specs}
                    <b onClick={() => modify_product.specs(product.id)}>
                      {" "}
                      (modify)
                    </b>
                  </td>
                  <td>
                    {product.price}
                    <b onClick={() => modify_product.price(product.id)}>
                      {" "}
                      (modify)
                    </b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
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
  var modify_user = {
    change_username: (username) => {
      var new_username = window.prompt("enter new username here :");
      customAjax({
        params: {
          task_name: "change_username",
          old_username: username,
          new_username,
        },
      })
        .then(
          (data) => {
            alert("done");
          },
          (error) => {
            alert("there was an error and it is loged in console");
            console.log(error);
          }
        )
        .finally(() => {
          fetch_data();
        });
    },
  };
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
                  <td>
                    {user.username}
                    <b
                      onClick={() => modify_user.change_username(user.username)}
                      className="cursor-pointer"
                    >
                      {" "}
                      (modify)
                    </b>
                  </td>
                  <td>
                    {user.is_admin}{" "}
                    <b
                      className="cursor-pointer"
                      onClick={() => toggle_user_admin(user.id)}
                    >
                      {" "}
                      (toggle)
                    </b>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
