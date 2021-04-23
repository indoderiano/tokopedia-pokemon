import React, { useEffect, useState, useContext } from 'react'
import { css, cx } from '@emotion/css'
import ThemeContext from '../context'
import Loading from '../Components/Loading'
import {title} from '../supports/format'
import { Link } from 'react-router-dom'
import { gql } from '@apollo/client'
import client from '../config/graphql'


export default function PokemonList () {

    const {theme, toggleThemes} = useContext(ThemeContext)
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [isCovid, setIsCovid] = useState(false)
    const [displayNumber, setDisplayNumber] = useState(20)
    const [maxNumber, setMaxNumber] = useState(100)
    // const {list} = useSelector(state => state)
    const list = JSON.parse(localStorage.getItem('pokemon-collection')) || []


    useEffect(() => {
        setLoading(true)
        client
        .query({
        query: gql`
            query {
            pokemons(limit: ${displayNumber-pokemons.length}, offset: ${pokemons.length}){
                results{
                    name
                    image
                },
                count
            }
            }
        `
        })
        .then( async result => {
            setMaxNumber(result.data.pokemons.count)
    
            let newPokemonsData = await Promise.all(result.data.pokemons.results.map(async (pokemon, index) => {
                const poke = await client.query({
                    query: gql`
                        query {
                            pokemon(name: "${pokemon.name}"){
                                name
                                sprites{
                                    front_default,
                                    front_shiny
                                }
                            }
                        }
                    `
                })
                    let owned = 0
                    list.forEach(item => {
                        if(item.data.name === poke.data.pokemon.name){
                            owned++
                        }
                    })
    
                    return {
                        name: poke.data.pokemon.name,
                        front_default: poke.data.pokemon.sprites.front_default,
                        front_shiny: poke.data.pokemon.sprites.front_shiny,
                        owned
                    }
                
            }))
            
            setLoading(false)
            setPokemons([...pokemons, ...newPokemonsData])
    
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[displayNumber])


    return (
        <div
            className={
                css`
                background: ${theme.background};
                color: white;
                padding: 20px 0 30px;
                min-height: calc(100vh - 68px);
                `
            }
        >
            <h1 className="ui header inverted">Pokemon World</h1>

            <div
                className={
                    cx(
                        "ui compact segment",
                        css`
                            margin: auto!important;
                        `
                    )
                }
            >
                <div className="ui toggle checkbox">
                    <input
                        onChange={(e)=>{
                            setIsCovid(e.target.checked)
                            if(e.target.checked !== theme.isCovid){
                                toggleThemes()
                            }
                        }}
                        type="checkbox"
                        data-testid="select-covid"
                    />
                    <label>Covid Mode</label>
                </div>
            </div>

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
                    <div
                        className={
                            cx(
                                "ui link cards",
                                css`
                                    justify-content: center;
                                    margin-bottom: 20px!important;
                                `
                            )
                        }
                        data-testid="world"
                    >
                        {
                            pokemons.map((pokemon, index) => {
                                return (
                                    <Link
                                        to={`/details/${pokemon.name}`}
                                        key={index}
                                        className={
                                            cx(
                                                "card",
                                                css`
                                                max-width: 250px!important;
                                                -webkit-tap-highlight-color: transparent;
                                                `
                                            )
                                        }
                                        data-testid="pokemon-list"
                                    >
                                        <div
                                            className={
                                                cx(
                                                    "image",
                                                    css`
                                                    
                                                    `
                                                )
                                            }
                                        
                                        >
                                            <img
                                                alt="poke-icon"
                                                className={
                                                    css`

                                                    `
                                                }
                                                src={ isCovid ? pokemon.front_shiny : pokemon.front_default }
                                                data-testid={theme.isCovid ? 'poke-covid' : 'poke-normal'}
                                            />
                                        </div>
                                        <div
                                            className="content"
                                        >
                                            <div
                                                className={
                                                    cx(
                                                        "header",
                                                        css`
                                                        
                                                        `
                                                    )
                                                }
                                            >{title(pokemon.name)}</div>
                                            
                                            <div className="description">
                                                In Collection 
                                                <div
                                                    className={
                                                        cx(
                                                            "ui label",
                                                            css`
                                                            margin-left: 10px!important;
                                                            `
                                                        )
                                                    }
                                                >
                                                    {pokemon.owned}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    {
                        loading ?
                        <Loading/>
                        :
                        <div>
                            <button
                                onClick={()=>{
                                    let newDisplayNumber = displayNumber + 10
                                    if( newDisplayNumber > maxNumber ){
                                        newDisplayNumber = maxNumber
                                    }
                                    setDisplayNumber(newDisplayNumber)
                                }}
                                className="ui button big"
                                data-testid="button-more-pokemons"
                            >
                                More
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}