import { useParams } from "react-router-dom";

export default function Blog() {
  var blog_id = useParams().blog_id;
  return <p>here is blog page</p>;
}
