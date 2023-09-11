import { SupportMessageRow } from "./SupportMessageRow";
import { CompanyInfo } from "./CompanyInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
import { Fragment } from "react";
export const ContactUs = () => {
	var nav = useNavigate();

	return (
		<Section
			title="ارتباط با ما"
			className="m-2"
		>
			<CompanyInfo />
		</Section>
	);
};
