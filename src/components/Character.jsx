import {useState, useEffect, useReducer, useMemo, useRef, useCallback} from 'react'
import Search from './Search'

const initialState = {
	favorites: []
}

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload]
			}
		default:
			return state;
	}
}

export default function Character() {
	const [getCharacter, setCharacter] = useState([])
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	const [search, setSearch] = useState('')
	const searchInput = useRef(null)

	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
		.then(response => response.json())
		.then(data => setCharacter(data.results))
	}, [])

	function handleClick(favorite) {
		dispatch({
			type: 'ADD_TO_FAVORITE',
			payload: favorite
		})
	}

	// function handleSearch() {
	// 	setSearch(searchInput.current.value)
	// }
	const handleSearch = useCallback(() => {
		setSearch(searchInput.current.value)
	},[])
	// const filterOfUsers = getCharacter.filter((user) => {
	// 	return user.name.toLowerCase().includes(search.toLowerCase())
	// })

	const filterOfUsers = useMemo(() =>
		getCharacter.filter((user) => {
			return user.name.toLowerCase().includes(search.toLowerCase())
		}),
		[search, getCharacter]
	)

	return (
		<div>
			{favorites.favorites.map(favorite => (
					<ul key={favorite.id}>
						<li>{favorite.name}</li>
					</ul>
			))}

			<Search seacrh={search} searchInput={searchInput} handleSearch={handleSearch} />

			{filterOfUsers.map((detail) => (
				<div className="item" key={detail.id}>
					<h2>{detail.name}</h2>
					<button type='button' onClick={()=>handleClick(detail)}>add favorites</button>
				</div>
			))}
	 </div>
 )
}