import React, { useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function PokemonList () {

    const [pokemons, setPokemons] = useState([])
    const {message} = useSelector(state => state)

    useEffect(() => {
        loadPokemons()
        console.log(message)
    },[])

    const loadPokemons = () => {
        axios({
            method: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon?limit=40&offset=0`
        })
        .then(response => {
            console.log(response)
            setPokemons(response.data.results)
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
            <div>
                <div className={
                    cx(
                        "ui relaxed divided list inverted",
                        css`
                        max-width: auto;
                        margin: auto!important;
                        padding: 20px 20px!important;
                        `
                    )
                }>
                    {
                        pokemons.map((pokemon, index) => {
                            return (
                                <div className="item" key={index}>
                                    <div className="content">
                                    <Link to={`/details/${pokemon.url.slice(pokemon.url.length-2,pokemon.url.length-1)}`} className="header">{pokemon.name}</Link>
                                    {/* <div className="description">Updated 10 mins ago</div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div class="ui inverted segment">
                <div class="ui inverted relaxed divided list">
                    <div class="item">
                    <div class="content">
                        <div class="header">Snickerdoodle</div>
                        An excellent companion
                    </div>
                    </div>
                    <div class="item">
                    <div class="content">
                        <div class="header">Poodle</div>
                        A poodle, its pretty basic
                    </div>
                    </div>
                    <div class="item">
                    <div class="content">
                        <div class="header">Paulo</div>
                        He's also a dog
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}