import { Done, Edit } from "@mui/icons-material";
import { Fragment } from "react";

export function CustomRow({ fields, extra = null }) {
	/* 
        fields should only contain simple string or number
        as their value and key props
    */
	/*
        fields should be an array which it's items should be either
        in one of these forms : 
        type1: {key : string|number, value : string|number, change_function : undefined | function}
        type2: {type : "option", key : string|number, onClick : function}
    */
	var styles = {
		action_area:
			"inline-flex items-center w-fit hover:bg-blue-700 rounded hover:text-white px-1 cursor-pointer",
		info_area: "hover:bg-blue-500 rounded hover:text-white px-1 cursor-default",
	};
	return (
		<div className="border border-stone-400 p-1 rounded">
			{fields.map((field, index, array) => {
				if (field.type === "option") {
					return (
						<Fragment key={index}>
							<div className="flex items-center space-x-1">
								<span className={styles.info_area}>{field.key}</span>
								<span> | </span>
								<span
									className={styles.action_area}
									onClick={field.onClick}
								>
									<Done />
									تایید
								</span>
							</div>
							{index !== array.length - 1 && <hr />}
						</Fragment>
					);
				} else {
					return (
						<Fragment key={index}>
							<div className="flex items-center space-x-1 flex-wrap">
								<span className={styles.info_area}>نام مشخصه : {field.key}</span>
								<span> | </span>
								<span className={styles.info_area}>
									مقدار مشخصه : {field.value ? String(field.value) : "بدون مقدار"}
								</span>
								<span> | </span>
								<span
									className={styles.action_area}
									onClick={
										field.change_function
											? field.change_function
											: () => {
													alert(
														`"${field.key}" : این مشخصه قابل تغییر نیست`
													);
											  }
									}
								>
									<Edit /> ویرایش
								</span>
							</div>
							{index !== array.length - 1 && <hr />}
						</Fragment>
					);
				}
			})}
			{extra}
		</div>
	);
}
