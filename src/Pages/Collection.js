import { cx, css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {title} from '../supports/format'

export default function Collection () {
    // const {list} = useSelector(state => state)
    const [list, setList] = useState( JSON.parse(localStorage.getItem('pokemon-collection')) )
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(list)
    },[])

    const updateList = (index) => {
        console.log(index)
        let newList = [...list]
        newList.splice(index,1)
        console.log(newList)

        dispatch({
            type: 'POKE/UPDATE',
            payload: newList
        })

        setList(newList)
        localStorage.setItem('pokemon-collection', JSON.stringify(newList))
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
            <h1 className="ui header inverted">Collection</h1>

            <div className={
                cx(
                    "ui cards",
                    css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    `
                )
            }>
                {
                    list.length?
                    list.map((pokemon, index) => {
                        console.log(pokemon)
                        return (
                            <div
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
                                    <img src={pokemon.data.sprites.front_default}/>
                                </div>
                                <div className="content">
                                    <a className="header">{title(pokemon.nickname)}</a>
                                    
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
                                    >
                                        Release
                                    </button>
                                </div>
                                <div className="extra content">
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