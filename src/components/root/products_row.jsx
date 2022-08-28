export function ProductsRow({ products, icon, title }) {
	return (
		<div className="flex h-16 bg-blue-400 rounded text-white">
			<div className="flex flex-col justify-center">
				<div className="h-10 w-10 bg-blue-500 rounded-full">{icon}</div>
				<h1>{title}</h1>
			</div>
			{products.map((product, index) => {
				return <div className="bg-orange-400 text-white">{JSON.stringify(product)}</div>;
			})}
		</div>
	);
}
