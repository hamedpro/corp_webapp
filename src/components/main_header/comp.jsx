import { useContext } from "react";
import context from "../../global_context";

function BackButton() {
  var context_data = useContext(context);
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
  var context_data = useContext(context);
  return (
    <div
      className={`mx-auto w-full border border-blue-200 bg-blue-200 rounded mt-2 flex items-center flex-row p-2`}
    >
      <div className="w-1/2">
        {context_data.c.header.back_button ? <BackButton /> : null}
        <span className="px-2">{context_data.c.header.title}</span>
      </div>
      <div className="w-1/2 flex flex-row justify-end">
        <div className="w-6 h-6 bg-blue-500 border border-white rounded"></div>
      </div>
    </div>
  );
}
