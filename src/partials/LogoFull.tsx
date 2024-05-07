import veco_logo from "/logo_veco-removebg-preview.png";
export const LogoFull = () => {
	return (
		<div className="d-flex align-items-center">
			<div className="f-w-6 d-flex align-items-center me-2 lh-1">
				<img
					src={veco_logo}
					style={{
						height: "33px",
						width: "33px",
						background: "aqua",
						padding: "6px 6px 0px",
						borderRadius: "12px",
						boxSizing: "content-box",
					}}
				/>

				<span
					className="fs-5"
					style={{ margin: "0px 12px" }}
				>
					پیشرو کنترل وطن
				</span>
			</div>
		</div>
	);
};
