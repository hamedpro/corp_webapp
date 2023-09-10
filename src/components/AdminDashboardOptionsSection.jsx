import { CompanyInfoSection } from "./CompanyInfoSection";
import { ManageIconsSection } from "./ManageIconsSection";
export function AdminDashboardOptionsSection() {
	return (
		<div className="flex flex-col w-full py-2">
			<input
				type="file"
				id="common_file_input"
				className="hidden"
			/>

			<div className="mb-2">
				<ManageIconsSection />
			</div>
			<div className="mb-2">
				<CompanyInfoSection />
			</div>
		</div>
	);
}
