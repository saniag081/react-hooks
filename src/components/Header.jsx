import { useState, useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

export default function Header() {
	const [daarkMode, setDarkMode] = useState(false)
	const color = useContext(ThemeContext)
	return (
		<header className="header">
			<h1 style={{color}}>React hooks</h1>
		</header>
	)
}