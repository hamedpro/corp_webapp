import { useState } from "react";
import "./s.css";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
function CustomInput({ id }) {
  return (
    <input id={id} className="border border-green-400 rounded px-2 py-1" />
  );
}
function cloned_obj(obj) {
  var tmp = {};
  for (key in obj) {
    tmp[key] = obj[key];
  }
  return tmp;
}
function cloned_array(arr) {
  var tmp = [];
  arr.forEach((item) => {
    tmp.push(item);
  });
  return tmp;
}
export default function NewProduct() {
  const [specs, set_specs] = useState([]);
  const [count, set_count] = useState(0);
  function submit_new_product() {
    customAjax({
      params: {
        task_name: "new_product",
        name: document.getElementById("name_input").value,
        description: document.getElementById("description_input").value,
        product_specs: JSON.stringify(specs),
        price: document.getElementById("price_input").value,
      },
    }).then(
      (data) => {
        var form = new FormData();
        var files = document.getElementById("images_input").files;
        var files_length = files.length;
        for (var i = 0; i < files_length; i++) {
          form.append(i, files[i]);
        }
        fetch(
          "http://localhost:4000?task_name=upload_product_images&product_id=" +
            data.result,
          {
            method: "POST",
            body: form,
          }
        )
          .then((data) => data.text())
          .then((data) => console.log(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function remove_spec(id) {
    if (!window.confirm("are you sure ?")) {
      return;
    }
    var tmp = cloned_array(specs);
    set_specs(tmp.filter((i) => i.id != id));
  }
  function add_spec() {
    var tmp = cloned_array(specs);
    tmp.push({
      id: count,
      key: window.prompt("enter specification key :"),
      value: window.prompt("enter its value:"),
    });
    set_specs(tmp);
    set_count((count) => count + 1);
  }
  return (
    <div
      id="new_product"
      className="mt-2 mx-auto w-full border border-blue-400 rounded p-2"
    >
      <h1 className="text-lg">new product page</h1>
      <hr />
      <p>name:</p>
      <CustomInput id="name_input" />

      <p>description:</p>
      <CustomInput id="description_input" />

      <p>
        product specifictions:{" "}
        <button
          className="text-sm border border-blue-400 rounded inline"
          onClick={add_spec}
        >
          add new
        </button>
      </p>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>key</th>
            <th>value</th>
            <th>options</th>
          </tr>
          {specs.map((spec) => {
            return (
              <tr key={spec.id}>
                <td>{spec.id}</td>
                <td>{spec.key}</td>
                <td>{spec.value}</td>
                <td onClick={() => remove_spec(spec.id)}>remove</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>price:</p>
      <CustomInput id="price_input" />
      <p>images : </p>
      <br />
      <input id="images_input" type="file" multiple />
      <button
        onClick={submit_new_product}
        className="block border border-blue-400 rounded mt-4 hover:text-white hover:bg-blue-600 px-2 py-1"
      >
        add new product as @{window.localStorage.getItem("username")}
      </button>
    </div>
  );
}
