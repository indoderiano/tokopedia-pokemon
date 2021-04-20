import React from 'react'
import { useDispatch } from 'react-redux'

export default function Collection () {
    const {list} = useDispatch(state => state)

    return (
        <div>
            Collections
        </div>
    )
}