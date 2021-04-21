import { cx, css } from '@emotion/css'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {title} from '../supports/format'

export default function Collection () {
    const {list} = useSelector(state => state)

    useEffect(()=>{
        console.log(list)
    })

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
            <h1 class="ui header inverted">Collection</h1>

            <div className={
                cx(
                    "ui cards",
                    css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    `
                )
            }>
                {
                    list.length?
                    list.map(pokemon => {
                        return (
                            <div class="ui card">
                                <div class="image">
                                    <img src={pokemon.data.sprites?.other['official-artwork'].front_default}/>
                                </div>
                                <div class="content">
                                    <a class="header">{title(pokemon.nickname)}</a>
                                    {/* <div class="meta">
                                    <span class="date">Joined in 2013</span>
                                    </div> */}
                                    <div class="description">
                                        {title(pokemon.data.name)}
                                    </div>
                                </div>
                                <div class="extra content">
                                    {/* <i class="user icon"></i> */}
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