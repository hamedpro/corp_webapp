import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
export default function AdminDashboard() {
	return (
		<div id="admin-dashboard">
			<OptionsSection />
			<UsersSection />
			<ProductsSection />
		</div>
	);
}
