export default function Search({search, searchInput, handleSearch}) {
	return (
		< div className="search">
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				ref={searchInput}
			/>
		</div>
	)
}