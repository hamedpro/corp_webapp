export function CustomTable({ headerItems, rows, children, className = null }) {
	return (
		<div
			className={
				"border border-blue-400 bg-blue-300 rounded-lg flex flex-col p-2" +
				(className ? ` ${className}` : ``)
			}
		>
			<table>
				<thead>
					<tr>
						{headerItems.map((headerItem, index) => {
							return <th key={index}>{headerItem}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => {
						return (
							<tr key={index} className="border border-blue-400">
								{row.map((cell, index) => {
									return (
										<td key={index} onClick={cell.onClick}>
											{cell.value}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mt-2">{children}</div>
		</div>
	);
}
/* 
how to use it : 
<CustomTable
    headerItems={["id", "name", "lastname"]}
    rows={[
        [
            {
                value: "2",
                onclick: () => {
                    alert("id is clicked");
                },
            },
            {
                value: "hamed",
                onClick: () => {
                    alert("name is clicked");
                },
            },
            {
                value: "yaghootpour",
                onClick: () => {
                    alert("lastname is clicked");
                },
            },
        ],
    ]}
>
    this is what comes after that
</CustomTable>
*/
