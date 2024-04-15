export const ReviewStarsMedium = ({ width }: { width: any }) => {
	return (
		<div className="rating position-relative d-table">
			<div
				className="position-absolute stars"
				style={{ width: width || "80%" }}
			>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} ri-2x mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} ri-2x mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} ri-2x mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} ri-2x mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} ri-2x mr-1"></i>
			</div>
			<div className="stars">
				<i className="ri-star-fill ri-2x mr-1 text-muted"></i>
				<i className="ri-star-fill ri-2x mr-1 text-muted"></i>
				<i className="ri-star-fill ri-2x mr-1 text-muted"></i>
				<i className="ri-star-fill ri-2x mr-1 text-muted"></i>
				<i className="ri-star-fill ri-2x mr-1 text-muted"></i>
			</div>
		</div>
	);
};
