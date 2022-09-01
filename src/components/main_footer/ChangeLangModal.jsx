import { useState } from "react";
import Modal from "../Modal/Modal";
import { ModalBackground } from "../modal_background/comp";
import { multi_lang_helper as ml } from "../../common";
export function ChangeLangModal({ hideFn, is_visible }) {
	return (
		<>
			<ModalBackground open={is_visible} />
			<div
				className={
					"fixed top-0 left-0 h-full w-full flex justify-center items-center z-50" +
					(is_visible ? "" : " hidden")
				}
			>
				<div className={"w-1/2 h-1/2 bg-blue-700 text-white"}>
					<h1 className="text-lg">
						{ml({
							en: "warning!",
							fa: "هشدار!",
						})}
					</h1>
					<p>
						{ml({
							en: `you have changed the language. you have to reload the page so changes will
                            be applied.`,
							fa: "شما زبان سایت را تغییر داده اید.باید این صفحه را ریلود کنید تا تغییرات اعمال شود",
						})}
					</p>
					<div className="flex">
						<button onClick={hideFn}>
							{ml({
								en: "dismiss",
								fa: "بی خیال",
							})}
						</button>
						<button onClick={() => window.location.reload()}>
							{ml({
								en: `reload this page`,
								fa: "ریلود کردن صغحه",
							})}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
