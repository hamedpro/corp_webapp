import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
export default function Products() {
  var nav = useNavigate();
  function ProductItem({ id, name, price }) {
    return (
      <div className="my-2 w-full block border border-blue-400 rounded">
        <p className="p-1">
          product id : {id} - product name : {name} - product price : {price}
        </p>
        <button
          className="border border-blue-400 rounded text-sm inline m-1 "
          onClick={() => nav("/product/" + id)}
        >
          open it
        </button>
      </div>
    );
  }
  const [products, set_products] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <div className="mx-auto border border-blue-400 rounded mt-2 p-2">
      <h1 className="text-lg">products page</h1>
      <hr />
      <div className="flex flex-col">
        {products.map((product) => {
          return (
            <ProductItem
              id={product.id}
              name={product.name}
              price={product.price}
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}
