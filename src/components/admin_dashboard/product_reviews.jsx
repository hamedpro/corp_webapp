import { InfoRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { Alert } from "../alert/comp";
import { CustomTable } from "../custom_table/comp";
import { Loading } from "../loading/comp";

export function ProductReviews() {
	var [reviews, set_reviews] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_all_product_reviews",
			},
		}).then(
			(data) => {
				set_reviews(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	function toggle_review_verification_status(review_id) {
		customAjax({
			params: {
				task_name: "toggle_review_verification_status",
				id: review_id,
			},
		}).then(fetch_data, (e) => console.log(e));
	}
	return (
		<div className="flex flex-col">
			{ml({
				en: "product reviews",
				fa: "بررسی های کالا",
			})}{" "}
			{/* todo add filter option */}
			{reviews === null ? (
				<Loading />
			) : (
				<>
					{reviews.length === 0 ? (
						<Alert icon={<InfoRounded />}>
							{ml({
								en: "there is not any reviews submited",
								fa: "اینجا هتوز هیچ بررسی ای ثبت نشده است",
							})}
						</Alert>
					) : (
						<CustomTable
							headerItems={[
								ml({ en: "id", fa: "شناسه" }),
								ml({ en: "product id", fa: "شناسه کالا" }),
								ml({ en: "username", fa: "نام کاربری" }),
								ml({ en: "rating from five", fa: "رتبه از پنج" }),
								ml({ en: "pros", fa: "نقاط مثبت" }),
								ml({ en: "cons", fa: "نقاط منفی" }),
								ml({ en: "text", fa: "متن بررسی" }),
								ml({ en: "time", fa: "زمان ثبت" }),
								ml({ en: "verification_status", fa: "وضعیت تایید" }),
							]}
							rows={reviews.map((review, index) => {
								var message = ml({
									en: 'this field cant be changed \n changable fields for user reviews : "verification_status"',
									fa: "این مقدار نمیتواند تغییر کند. مقادیر تغییر پذیر برای بررسی های کاربران به این صورت هستند: وضعیت تایید بررسی",
								});
								return [
									{
										value: review.id,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.product_id,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.username,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.rating_from_five,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.pros,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.cons,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.text,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.time,
										onClick: () => {
											alert(message);
										},
									},
									{
										value: review.verification_status,
										onClick: () => {
											toggle_review_verification_status(Number(review.id));
										},
									},
								];
							})}
						/>
					)}
				</>
			)}
		</div>
	);
}
