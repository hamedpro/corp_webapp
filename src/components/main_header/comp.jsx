import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import context from "../../global_context";

function BackButton() {
  var handler = () => {
    window.history.back();
  };
  return (
    <button onClick={handler} className="p-2 text-black rounded flex">
      {"<-"}
    </button>
  );
}
export default function MainHeader() {
  var [back_button, set_back_button] = useState(false);
  var loc = useLocation();
  useEffect(() => {
    set_back_button(window.location.pathname != "/");
  }, [loc]);
  var nav = useNavigate();
  return (
    <div
      className={`mx-auto w-full border border-blue-200 bg-blue-200 rounded mt-2 flex items-center flex-row p-2`}
    >
      <div className="w-3/4 flex flex-row items-center">
        {back_button ? <BackButton /> : null}
        <span className="px-2">corp_webapp</span>
      </div>
      <div className="w-1/4 flex flex-row justify-end">
        <div
          onClick={
            window.localStorage.getItem("username") === null
              ? () => {
                  nav("/login");
                }
              : () => {
                  nav("/user/" + window.localStorage.getItem("username"));
                }
          }
          className="cursor-pointer px-1 text-white bg-blue-500 border rounded flex justify-center items-center"
        >
          {window.localStorage.getItem("username") === null ? (
            <b>login</b>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-person-fill mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <b className="cursor-pointer">
                @{window.localStorage.getItem("username")}
              </b>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
