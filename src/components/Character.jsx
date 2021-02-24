import {useState, useEffect} from 'react'

export default function Character() {
	const [getCharacter, setCharacter] = useState([])
	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
		.then(response => response.json())
		.then(data => setCharacter(data))
	},[])
	console.log(getCharacter)
	return (
		<div>
			{getCharacter.results.map((detail) => (
				<h2>{detail.name}</h2>
			))
			}
	 </div>
 )
}