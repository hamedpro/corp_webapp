import React from "react";
import cart_items from "../data/cart-items.json";
export const CartItems: React.FC = () => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th className="d-none d-sm-table-cell"></th>
					<th className="ps-sm-3">Details</th>
					<th>Qty</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{cart_items.entries.map(
					({ title, options, currency, price, qty, "line-total": lineTotal }) => (
						<tr>
							{/* image */}
							<td className="d-none d-sm-table-cell">
								<picture className="d-block bg-light p-3 f-w-20">
									<img
										className="img-fluid"
										src="{ img }"
										alt="{config.defaultImgAlt}"
									/>
								</picture>
							</td>
							{/* image */}

							{/* Details */}
							<td>
								<div className="ps-sm-3">
									<h6 className="mb-2 fw-bolder">{title}</h6>
									<small className="d-block text-muted">{options}</small>
								</div>
							</td>
							{/* Details */}

							{/* Qty */}
							<td>
								<div className="px-3">
									<span className="small text-muted mt-1">
										{qty} @ {currency}
										{price}
									</span>
								</div>
							</td>
							{/* /Qty */}

							{/* Actions */}
							<td className="f-h-0">
								<div className="d-flex justify-content-between flex-column align-items-end h-100">
									<i className="ri-close-circle-line ri-lg"></i>
									<p className="fw-bolder mt-3 m-sm-0">
										{currency}
										{lineTotal}
									</p>
								</div>
							</td>
							{/* /Actions */}
						</tr>
					)
				)}
			</tbody>
		</table>
	);
};
