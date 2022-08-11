import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
export default function User() {
	var username = useParams().username;
	const [user, set_user] = useState({
		id: "loading...",
		username: "loading...",
		is_admin: "loading...",
	});
	var [profile_image_src, set_profile_image_src] = useState(null);
	function upload_the_photo() {
		var form = new FormData();
		var file = document.getElementById("profile_image_input").files[0];
		form.append("image", file);
		fetch("http://localhost:4000?task_name=new_user_profile_image&username=" + username, {
			method: "POST",
			body: form,
		})
			.then((data) => data.json())
			.then((data) => {
				if (data.result) {
					alert("done");
				}
			})
			.finally(() => {
				fetch_data();
			});
	}
	function change_password() {
		var old_password = prompt("enter your old password:");
		var new_password = prompt("enter your new password: ");
		customAjax({
			params: {
				task_name: "change_password",
				username: window.localStorage.getItem("username"),
				old_password,
				new_password,
			},
		})
			.then(
				(data) => {
					if (data.result) {
						alert("done");
					}
				},
				(error) => {
					console.log(error);
				}
			)
			.finally(() => {
				fetch_data();
			});
	}
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_user(data.result.filter((i) => i.username == username)[0]);
			},
			(error) => {
				console.log(error);
			}
		);
		customAjax({
			params: {
				task_name: "get_profile_image_src",
				username,
			},
		}).then((data) => {
			set_profile_image_src(data.result);
		});
	}

	useEffect(() => {
		fetch_data();
	}, []);

	return (
		<>
			<div
				className={`mx-auto border 
      border-blue-400 rounded mt-2 p-2 flex items-center`}
			>
				<div className="w-2/6 border border-blue-400">
					{profile_image_src === null ? (
						<h1>profile image is not uploaded</h1>
					) : (
						<img
							className="w-full min-h-10 border border-blue-400"
							src={profile_image_src}
						/>
					)}
				</div>
				<div className="w-4/6 border border-blue-400">
					<h1>user account</h1>
					<hr />
					<p>user_id: {user.id}</p>
					<p>username: {user.username}</p>
					<p>is_admin: {user.is_admin}</p>
				</div>
			</div>
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2">
				<h1>options</h1>
				<hr />
				<p onClick={change_password}>change my password</p>
				<input
					onChange={upload_the_photo}
					id="profile_image_input"
					type="file"
					className="hidden"
				/>
				<p
					onClick={() => {
						document.getElementById("profile_image_input").click();
					}}
				>
					upload new profile image
				</p>
			</div>
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2"></div>
		</>
	);
}
