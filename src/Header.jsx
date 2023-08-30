import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img 
                src="src\troll-face.png" 
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">Make Your own Memes</h4>
        </header>
    )
}