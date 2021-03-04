import {useState, useReducer, useMemo, useRef, useCallback} from 'react'
import useCharacter from '../hooks/useCharacter'
import Search from './Search'

const initialState = {
	favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/'

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
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	const [search, setSearch] = useState('')
	const searchInput = useRef(null)

	const getCharacter = useCharacter(API)
	console.log(getCharacter)
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