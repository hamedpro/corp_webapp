import { InfoRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common";
import { CustomTable } from "../custom_table/comp.jsx";
import { Alert } from "../alert/comp"
import {Loading} from "../loading/comp"
export default function UsersSection() {
	const [users, set_users] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_users(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);

	var modify_user = ({ task, payload }) => {
		switch (task) {
			case "username":
				customAjax({
					params: {
						task_name: "change_username",
						old_username: payload.old_username,
						new_username: window.prompt(
							ml({
								en: "enter new username here",
								fa: "نام کاربری جدید را وارد کنید",
							})
						),
					},
				})
					.then(
						(data) => {
							alert(
								ml({
									en: "done",
									fa: "انجام شد",
								})
							);
						},
						(error) => {
							alert(
								ml({
									en: "something went wrong",
									fa: "مشکلی رخ داد",
								})
							);
							console.log(error);
						}
					)
					.finally(() => {
						fetch_data();
					});
				break;
			case "is_admin":
				customAjax({
					params: {
						task_name: "toggle_user_admin_state",
						username: payload.username,
					},
				})
					.then(
						(data) => {
							if (data.result) {
								alert(
									ml({
										en: "done",
										fa: "انجام شد",
									})
								);
							}
						},
						(error) => {
							console.log(error);
						}
					)
					.finally(() => {
						fetch_data();
					});
				break;
		}
	};
	return (
		<div className="flex flex-col">
			{ml({
				en: "users:",
				fa: "کاربران:",
			})}
			<Loading is_loading={users === null} />
			{users !== null && users.length !== 0 && (
				<CustomTable
				headerItems={[
					ml({
						en: "user_id",
						fa: "شناسه کاربر",
					}),
					ml({
						en: "username",
						fa: "نام کاربری",
					}),
					ml({
						en: "is_admin",
						fa: "دسترسی مدیر",
					}),
						'subscribed to email',
						'subscribed to sms',
						'email',
						'phone number',
						'time',
						'profile_picture_file_name',
					ml({
						en: "options",
						fa: "گزینه ها ",
					}),
					
				]}
				rows={users.map((user, index) => {
					return [
						{
							value: user.id,
							onClick: () => {
								alert(
									ml({
										en: "user id can't be changed",
										fa: "شناسه کاربر قابل تغییر نیست",
									})
								);
							},
						},
						{
							value: user.username,
							onClick: () => {
								modify_user({
									task: "username",
									payload: {
										old_username: user.username,
									},
								});
							},
						},
						{
							value: user.is_admin,
							onClick: () => {
								modify_user({
									task: "is_admin",
									payload: { username: user.username },
								});
							},
						},
						{
							value: user.is_subscribed_to_email,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},
						
						{
							value: user.is_subscribed_to_sms,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},
						{
							value: user.email,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},
						{
							value: user.phone_number,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},
						{
							value: user.time,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},
						{
							value: user.profile_image_file_name,
							onClick: () => {
								alert('functionality of changing this field will be added soon!')
							}
						},

						{
							value: ml({
								en: "delete his/her profile picture",
								fa: "حذف عکس این کاربر",
							}),
							onClick: () => {
								alert(
									ml({
										en: "this feature is under development",
										fa: "این ویژگی در حال توسعه است",
									})
								);
							},
						} /* todo implent it */,
					];
				})}
			/>
			)}
			{users !== null && users.length === 0 && (
				<Alert icon={<InfoRounded />}>
					there is not any user registered!
				</Alert>
			)}
		</div>
	);
}
