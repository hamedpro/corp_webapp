export const ReviewStarsSmall = ({ width }: { width: any }) => {
	return (
		<div className="rating position-relative d-table">
			<div
				className="position-absolute stars"
				style={width || "80%"}
			>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} mr-1"></i>
				<i className="ri-star-fill {{#if colour}}{{colour}}{{else}}text-dark{{/if}} mr-1"></i>
			</div>
			<div className="stars">
				<i className="ri-star-fill mr-1 text-muted opacity-25"></i>
				<i className="ri-star-fill mr-1 text-muted opacity-25"></i>
				<i className="ri-star-fill mr-1 text-muted opacity-25"></i>
				<i className="ri-star-fill mr-1 text-muted opacity-25"></i>
				<i className="ri-star-fill mr-1 text-muted opacity-25"></i>
			</div>
		</div>
	);
};
