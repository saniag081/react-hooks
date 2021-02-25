import {useState, useEffect, useReducer} from 'react'

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
	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
		.then(response => response.json())
		.then(data => setCharacter(data))
	}, [])

	function handleClick(favorite) {
		dispatch({
			type: 'ADD_TO_FAVORITE',
			payload: favorite
		})
	}

	return (
		<div>
			{favorites.favorites.map(favorite => (
					<ul key={favorite.id}>
						<li>{favorite.name}</li>
					</ul>
			))

			}
			{getCharacter.results?.map((detail) => (
				<div className="item" key={detail.id}>
					<h2>{detail.name}</h2>
					<button type='button' onClick={()=>handleClick(detail)}>add favorites</button>
				</div>
			))
			}
	 </div>
 )
}