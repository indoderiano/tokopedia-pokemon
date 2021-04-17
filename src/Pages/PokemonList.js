import React, { useEffect } from 'react'
import { css } from '@emotion/css'
import axios from 'axios'


export default function PokemonList () {

    useEffect(() => {
        loadPokemons()
    },[])

    const loadPokemons = () => {
        axios({
            method: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div
            className={
                css`
                background: rgba(0,0,0,.7);
                color: white;
                `
            }
        >
            Pokemon List
        </div>
    )
}