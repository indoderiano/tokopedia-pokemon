import { cx, css } from '@emotion/css'
import React, { useState, useContext } from 'react'
import ThemeContext from '../context'
import {title} from '../supports/format'

export default function Collection () {

    const {theme, toggleThemes} = useContext(ThemeContext)
    const [list, setList] = useState( JSON.parse(localStorage.getItem('pokemon-collection')) || [] )
    

    const updateList = (index) => {
        let newList = [...list]
        newList.splice(index,1)
        setList(newList)
        localStorage.setItem('pokemon-collection', JSON.stringify(newList))
    }

    return (
        <div
            className={
                css`
                background: ${theme.background}!important;
                color: white;
                padding: 20px 0 30px;
                min-height: calc(100vh - 68px);
                `
            }
        >
            <h1 className="ui header inverted">Collection</h1>

            <div
                className={
                    cx(
                        "ui cards",
                        css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        `
                    )
                }
                data-testid="collection"
            >
                {
                    list.length?
                    list.map((pokemon, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    cx(
                                        "ui card",
                                        css`
                                        max-width: 250px!important;
                                        `
                                    )
                                }
                            >
                                <div
                                    className={
                                        cx(
                                            "image",
                                            css`
                                                min-height: 290px;
                                            `
                                        )
                                    }
                                >
                                    <img alt='poke-collection' src={pokemon.data.sprites.front_default}/>
                                </div>
                                <div className="content">
                                    <h3 className="ui header">{title(pokemon.nickname)}</h3>
                                    <div className="description">
                                        {title(pokemon.data.name)}
                                    </div>

                                    <button
                                        className={
                                            cx(
                                                "ui orange basic button",
                                                css`
                                                    margin-top: 10px!important;
                                                `
                                            )
                                        }
                                        onClick={()=>{
                                            updateList(index)
                                        }}
                                        data-testid="button-release"
                                    >
                                        Release
                                    </button>
                                </div>
                                <div className="extra content">
                                    XP 
                                    {pokemon.data.base_experience}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div
                        className={
                            css`
                            margin-top: 10px;
                            `
                        }
                    >You have no pokemons</div>
                }
            </div>
        </div>
    )
}