import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { useParams } from "react-router-dom";
import { multi_lang_helper as ml } from "../../common";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
export default function Blog() {
	var blog_id = useParams().blog_id;
	return (
		<>
			<Section
				title={
					ml({
						en: "blog post",
						fa: "بلاگ پست",
					}) +
					" #" +
					blog_id
				}
			>
				<div className="px-2">
					<Alert icon={<InfoRounded sx={{ color: "white" }} />}>
						{ml({
							en: `this feature will be implented soon ! track the development in github link
							in footer`,
							fa: "این قابلیت به زودی توسعه پیدا میکند. وضعیت پیشرفت را  میتوانید در مخزن گیت هاب این پروژه دنبال کنید - لینک در پایین صفحه قرار دارد",
						})}
					</Alert>
					{/* todo */}
				</div>
			</Section>
		</>
	);
}
