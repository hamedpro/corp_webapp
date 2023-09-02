import { ReportGmailerrorredRounded } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { Alert } from "./Alert";
import { context } from "freeflow-react";
import { ReactNode } from "react";
import { find_active_profile_seed } from "freeflow-core/dist/utils";
export function CheckUserPrivilege({
	children,
	allowed_users,
}: {
	children: ReactNode;
	allowed_users: number[];
}) {
	var { profiles_seed, profiles } = useContext(context);

	var current_profile_seed = find_active_profile_seed(profiles_seed);
	if (current_profile_seed === undefined) {
		return "برای استفاده از این بخش ابتدا وارد حساب کاربری خود شوید.";
	}

	var status = allowed_users.includes(current_profile_seed.user_id) ? "allowed" : "not_allowed";
	return (
		<>
			{status === "allowed" && <>{children}</>}
			{status === "not_allowed" && (
				<Alert
					icon={<ReportGmailerrorredRounded />}
					className="mt-2"
				>
					{"شما مجوز دسترسی به این بخش را ندارید"}
					{/* todo tell the user if its enough to login with specific username  */}
				</Alert>
			)}
		</>
	);
}
