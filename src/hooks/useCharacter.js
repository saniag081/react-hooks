import {useState, useEffect} from 'react'

export default function useCharacter(url) {
	const [character, setCharacter] = useState([])

	useEffect(() => {
		fetch(url)
		.then(response => response.json())
		.then(data => setCharacter(data.results))
	},[url])
	return character
}