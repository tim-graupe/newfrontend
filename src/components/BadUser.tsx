import React from 'react'
import img from "../../src/Bard_Generated_Image.jpg"
import { Link } from 'react-router-dom'
type Props = {}

export const BadUser = (props: Props) => {
    return (
        <div>
            <h1>User not found!</h1>
            <Link to={"/"}>Go home</Link>
            <img src='img' alt='not found' />
        </div>
    )
}