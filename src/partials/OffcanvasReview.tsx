export const OffcanvasReview = () => {
	return (
		<div
			className="offcanvas offcanvas-end"
			tabIndex={-1}
			id="offcanvasReview"
		>
			<div className="offcanvas-header d-flex align-items-center">
				<h5
					className="offcanvas-title"
					id="offcanvasReviewLabel"
				>
					Leave A Review
				</h5>
				<button
					type="button"
					className="btn-close text-reset"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
				></button>
			</div>
			<div className="offcanvas-body">
				<form>
					<div className="form-group mb-3 mt-2">
						<label
							className="form-label"
							htmlFor="formReviewName"
						>
							Your Name
						</label>
						<input
							type="text"
							className="form-control"
							id="formReviewName"
							placeholder="Your Name"
						/>
					</div>
					<div className="form-group mb-3 mt-2">
						<label
							className="form-label"
							htmlFor="formReviewEmail"
						>
							Your Email
						</label>
						<input
							type="text"
							className="form-control"
							id="formReviewEmail"
							placeholder="Your Email"
						/>
					</div>
					<div className="form-group mb-3 mt-2">
						<label
							className="form-label"
							htmlFor="formReviewTitle"
						>
							Your Review Title
						</label>
						<input
							type="text"
							className="form-control"
							id="formReviewTitle"
							placeholder="Review Title"
						/>
					</div>
					<div className="form-group mb-3 mt-2">
						<label
							className="form-label"
							htmlFor="formReviewReview"
						>
							Your Review
						</label>
						<textarea
							className="form-control"
							name="formReviewReview"
							id="formReviewReview"
							cols={30}
							rows={5}
							placeholder="Your Review"
						></textarea>
					</div>
					<button
						type="submit"
						className="btn btn-dark hover-lift hover-boxshadow"
					>
						Submit Review
					</button>
				</form>
			</div>
		</div>
	);
};
