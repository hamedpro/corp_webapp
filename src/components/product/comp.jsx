import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
export default function Product() {
  var product_id = useParams().product_id;
  const [product, set_product] = useState({
    id: "loading ...",
    name: "loading ...",
    description: "loading ...",
    price: "loading ...",
    product_specs: "[]",
  });
  function fetch_data() {
    customAjax({
      params: {
        task_name: "get_products",
      },
    }).then(
      (data) => {
        set_product(data.result.filter((i) => i.id == Number(product_id))[0]);
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
        <h1>product page</h1>
        <hr />
        <p>product id : {product.id}</p>
        <p>product name : {product.name}</p>
        <p>product description : {product.description}</p>
        <p>product price : {product.price}</p>
      </div>
      <div className="mx-auto border border-blue-400 rounded mt-2 p-2">
        <h1 className="text-lg">product specs:</h1>
        <hr className="mb-2" />
        <table className="custom_border">
          <tbody>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            {JSON.parse(product.product_specs).map((spec) => {
              return (
                <tr key={spec.id}>
                  <td>{spec.key}</td>
                  <td>{spec.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
