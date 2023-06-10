import {
	AdminPanelSettingsRounded,
	Download,
	HomeRounded,
	InfoRounded,
	SettingsRemoteRounded,
	StoreRounded,
	SupportAgentRounded,
} from "@mui/icons-material";

export var header_options_array = [
	{ text: "صفحه اصلی", url: "/", icon: HomeRounded },
	{ text: "محصولات", url: "/products", icon: StoreRounded },
	{
		text: "کنترل اینترنتی",
		icon: SettingsRemoteRounded,
		x: true,
	},
	{ text: "درباره ما", url: "/about-us", icon: InfoRounded },
	{ text: "تماس با ما", url: "/contact-us", icon: SupportAgentRounded },
	{ text: "دانلود ها", url: "/download-center", icon: Download },
	{
		text: "داشبورد مدیر",
		url: "/admin-dashboard",
		icon: AdminPanelSettingsRounded,
		just_for_admin: true,
	},
];
