import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { css, cx } from '@emotion/css'

export default function PokemonDetails () {

    let { id } = useParams()
    const [pokemon, setPokemon] = useState({})
    const [movesNumber, setmovesNumber] = useState(3)

    useEffect(()=>{
        console.log(id)
        loadPokemon()
    },[])

    const loadPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            console.log(response.data)
            setPokemon(response.data)
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
                padding: 20px 0 30px;
                `
            }
        >
            <h2 class="ui header inverted">{pokemon.name}</h2>
            <div>
                <img
                    className={
                    cx(
                        "ui medium rounded image",
                        css`
                        margin: auto;
                        `
                    )
                    }
                    src={pokemon.sprites?.other['official-artwork'].front_default}></img>
            </div>


            <button class="big ui button">
                Catch
            </button>


            <h2 class="ui header inverted">Base Experience</h2>
            <h5
                className={
                    cx(
                        "ui header inverted",
                        css`
                        margin: 0 0 20px!important;
                        font-weight: 200!important;
                        `
                    )
                }>{pokemon.base_experience}
            </h5>

            <h2 class="ui header inverted">Height</h2>
            <h5
                className={
                    cx(
                        "ui header inverted",
                        css`
                        margin: 0 0 20px!important;
                        font-weight: 200!important;
                        `
                    )
                }>{pokemon.height}
            </h5>

            <div>
                <h2
                    className={
                        cx(
                            "ui header inverted",
                            css`
                            margin: 0 0 5px!important;
                            `
                        )
                    }
                >Moves</h2>
                <div>
                    {
                        pokemon.moves?.map((item, index) => {
                            if(index <= movesNumber){
                                return (
                                    <h5
                                        key={index}
                                        className={
                                            cx(
                                                "ui header inverted",
                                                css`
                                                margin: 0 0 5px!important;
                                                font-weight: 200!important;
                                                `
                                            )
                                        }>{item.move.name}
                                    </h5>
                                )
                            }
                        })
                    }
                    
                    {
                        pokemon.moves?.length-1 > movesNumber?
                        <h5
                            key='spe'
                            onClick={()=>{setmovesNumber(movesNumber+5)}}
                            className={
                                cx(
                                    "ui header inverted",
                                    css`
                                    margin: 0 0 5px!important;
                                    font-weight: 200!important;
                                    `
                                )
                            }>more...
                        </h5>
                        : null
                    }
                </div>
            </div>

            <div>
                <h2
                    className={
                        cx(
                            "ui header inverted",
                            css`
                            margin: 20px 0 5px!important;
                            `
                        )
                    }
                >Types</h2>
                <div>
                    {
                        pokemon.types?.map((item, index) => {
                            return (
                                <h5
                                    key={index}
                                    className={
                                        cx(
                                            "ui header inverted",
                                            css`
                                            margin: 0 0 5px!important;
                                            font-weight: 200!important;
                                            `
                                        )
                                    }>{item.type.name}
                                </h5>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}