import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
import "./s.css";
export default function SupportTicket() {
  var support_ticket_id = useParams().support_ticket_id;
  const [data, set_data] = useState({
    st_data: {
      id: "loading ...",
      username: "loading ...",
      title: "loading ...",
      text: "loading ...",
      type: "loading ...",
      is_proceed: "loading ...",
      proceeded_by: "loading ...",
    },
    st_comments: [],
  });
  function fetch_data() {
    customAjax({
      params: {
        task_name: "get_support_tickets",
      },
    }).then(
      (data) => {
        var support_ticket = data.result.filter(
          (i) => i.id == support_ticket_id
        )[0];
        set_data((data) => {
          data.st_data = support_ticket;
          return data;
        });
      },
      (error) => console.log(error)
    );
    customAjax({
      params: {
        task_name: "get_support_ticket_comments",
        support_ticket_id,
      },
    }).then(
      (data) => {
        set_data((old) => {
          old.st_comments = data;
          return old;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    fetch_data();
    setTimeout(() => {
      console.log(data.st_data.id);
    }, 2000);
  }, []);
  return (
    <div id="support_ticket">
      <div className="mt-2 p-2 mx-auto w-full border border-blue-400 rounded">
        <h1 className="text-lg">support ticket details</h1>
        <hr className="" />
        <table>
          <tbody>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr>
              <td>id</td>
              <td>{data.st_data.id}</td>
            </tr>
            <tr>
              <td>username</td>
              <td>{data.st_data.username}</td>
            </tr>
            <tr>
              <td>title</td>
              <td>{data.st_data.title}</td>
            </tr>
            <tr>
              <td>type</td>
              <td>{data.st_data.type}</td>
            </tr>
            <tr>
              <td>text</td>
              <td>{data.st_data.text}</td>
            </tr>
            <tr>
              <td>proceeding state</td>
              <td>
                {data.st_data.is_proceed == "true"
                  ? `this support ticket is proceeded by an admin with usename : ${data.st_data.proceeded_by}`
                  : "this support message is not proceeded yet "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded"></div>
      <table>
        <tbody>
          <tr>
            <th>comment id</th>
            <th>username</th>
            <th>text</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
