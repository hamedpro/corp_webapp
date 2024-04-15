export const CheckoutBilling = () => {
	return (
		<div className="billing-address checkout-panel d-none">
			<h5 className="title-checkout">Billing Address</h5>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label
							htmlFor="firstNameAddress"
							className="form-label"
						>
							First name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstNameAddress"
							placeholder=""
							value=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label
							htmlFor="lastNameAddress"
							className="form-label"
						>
							Last name
						</label>
						<input
							type="text"
							className="form-control"
							id="lastNameAddress"
							placeholder=""
							value=""
							required
						/>
					</div>
				</div>

				<div className="col-12">
					<div className="form-group">
						<label
							htmlFor="addressAddress"
							className="form-label"
						>
							Address
						</label>
						<input
							type="text"
							className="form-control"
							id="addressAddress"
							placeholder="123 Some Street Somewhere"
							required
						/>
					</div>
				</div>

				<div className="col-md-12">
					<div className="form-group">
						<label
							htmlFor="countryAddress"
							className="form-label"
						>
							Country
						</label>
						<select
							className="form-select"
							id="countryAddress"
							required
						>
							<option value="">Please Select...</option>
							<option>United States</option>
						</select>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label
							htmlFor="stateAddress"
							className="form-label"
						>
							State
						</label>
						<select
							className="form-select"
							id="stateAddress"
							required
						>
							<option value="">Please Select...</option>
							<option>California</option>
						</select>
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label
							htmlFor="zipAddress"
							className="form-label"
						>
							Zip/Post Code
						</label>
						<input
							type="text"
							className="form-control"
							id="zipAddress"
							placeholder=""
							required
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
