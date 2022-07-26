import { useState, useEffect } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
export default function ProductsSection() {
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
  var modify_product = ({ task, payload }) => {
    switch (task) {
      case "name":
        var new_name = window.prompt("enter the new name of this product:");

        customAjax({
          params: {
            task_name: "change_product_name",
            new_name,
            product_id: payload.product_id,
          },
        })
          .then(
            (data) => {
              alert("done");
            },
            (error) => {
              console.log(error);
            }
          )
          .finally(() => {
            update_products_section();
          });
        break;
      case "description":
        var new_description = window.prompt(
          "enter the new description of this product:"
        );

        customAjax({
          params: {
            task_name: "change_product_description",
            product_id: payload.product_id,
            new_description,
          },
        })
          .then(
            (data) => {
              alert("done");
            },
            (error) => {
              console.log(error);
            }
          )
          .finally(() => {
            update_products_section();
          });
        break;
      case "specs":
        break;
      case "price":
        var new_price = window.prompt("enter the new price of this product:");
        if (isNaN(Number(new_price))) {
          window.alert("given price was not a number");
          return;
        }
        customAjax({
          params: {
            task_name: "change_product_price",
            product_id: payload.product_id,
            new_price: Number(new_price),
          },
        })
          .then(
            (data) => {
              alert("done");
            },
            (error) => {
              console.log(error);
            }
          )
          .finally(() => {
            update_products_section();
          });
        break;
    }
  };
  return (
    <div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
      <h1>products:</h1>
      <hr />
      <table className="custom_border">
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
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {product.name}
                  <b
                    onClick={() =>
                      modify_product({
                        task: "name",
                        payload: { product_id: product.id },
                      })
                    }
                  >
                    {" "}
                    (modify)
                  </b>
                </td>
                <td>
                  {product.description}
                  <b
                    onClick={() =>
                      modify_product({
                        task: "description",
                        payload: { product_id: product.id },
                      })
                    }
                  >
                    {" "}
                    (modify)
                  </b>
                </td>
                <td>
                  {product.specs}
                  <b
                    onClick={() =>
                      modify_product({
                        task: "specs",
                        payload: {
                          product_id: product.id,
                          old_specs: product.specs,
                        },
                      })
                    }
                  >
                    {" "}
                    (modify)
                  </b>
                </td>
                <td>
                  {product.price}
                  <b
                    onClick={() =>
                      modify_product({
                        task: "price",
                        payload: { product_id: product.id },
                      })
                    }
                  >
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
