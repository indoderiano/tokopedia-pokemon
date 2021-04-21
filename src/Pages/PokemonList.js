import React, { useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'
import axios from 'axios'
import Loading from '../Components/Loading'
import {title} from '../supports/format'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'
import client from '../config/graphql'


export default function PokemonList () {

    const [pokemons, setPokemons] = useState([])
    const {message} = useSelector(state => state)
    const [displayNumber, setDisplayNumber] = useState(20)
    const [maxNumber, setMaxNumber] = useState(100)
    const [loading, setLoading] = useState(false)

    const {list} = useSelector(state => state)


    useEffect(() => {
        loadPokemons()
        console.log(message)
    },[])

    useEffect(async () => {
        loadPokemons()
    },[displayNumber])

    const loadPokemons = async () => {
        setLoading(true)
        client
          .query({
            query: gql`
              query {
                pokemons(limit: ${displayNumber-pokemons.length}, offset: ${pokemons.length}){
                    results{
                        name,
                        url
                    },
                    count
                }
              }
            `
          })
          .then( async result => {
                let newPokemons = result.data.pokemons.results.map(poke => {
                    return {
                        name: poke.name,
                        url: poke.url
                    }
                })
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

                        // console.log(index)
                        // newPokemons[index].front_default = poke.data.pokemon.sprites.front_default

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
                


                console.log('finish')
                console.log(newPokemonsData)
                setLoading(false)
                setPokemons([...pokemons, ...newPokemonsData])

            
          });

    }


    return (
        <div
            className={
                css`
                background: rgba(24,27,29);
                color: white;
                padding: 20px 0 30px;
                min-height: calc(100vh - 68px);
                `
            }
        >
            <h1 class="ui header inverted">Pokemon World</h1>
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
                                                    width: 230px!important;
                                                `
                                            )
                                        }
                                    >
                                        <div class="image">
                                            <img src={pokemon.front_default}/>
                                        </div>
                                        <div class="content">
                                            <div class="header">{title(pokemon.name)}</div>
                                            {/* <div class="meta">
                                                <a>Friends</a>
                                            </div> */}
                                            <div class="description">
                                                <div class="ui label">
                                                    In Collection {pokemon.owned}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="extra content">
                                            <span class="right floated">
                                                Joined in 2013
                                            </span>
                                            <span>
                                                <i class="user icon"></i>
                                                75 Friends
                                            </span>
                                        </div> */}
                                    </Link>
                                    // <div className="item" key={index}>
                                    //     <div className="content">
                                    //     <Link to={`/details/${pokemon.name}`} className="header">{pokemon.name}</Link>
                                    //     {/* <div className="description">Updated 10 mins ago</div> */}
                                    //     </div>
                                    // </div>
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
                                className="ui button big">
                                More
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}