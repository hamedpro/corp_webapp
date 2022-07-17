import { useContext, useEffect } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";

export default function NewSupportTicket() {
  function new_supprot_ticket() {
    customAjax({
      params: {
        task_name: "new_support_ticket",
        username: "",
        text: document.getElementById("support_ticket_text_input"),
      },
    }).then(
      (data) => {
        if (data.result) {
          alert("done");
        } else {
          alert("result field was not true");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  return (
    <>
      <h1>new support ticket</h1>
      <hr />
      <p>enter support ticket text:</p>
      <textarea
        id="support_ticket_text_input"
        className="border border-green-600"
      ></textarea>
      <button onClick={new_supprot_ticket}>submit support ticket</button>
    </>
  );
}
