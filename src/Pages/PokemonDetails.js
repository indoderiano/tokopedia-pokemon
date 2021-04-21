import React, { useEffect, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { useParams, Redirect } from 'react-router'
import {title} from '../supports/format'
import Loading from '../Components/Loading'
import axios from 'axios'
import { css, cx } from '@emotion/css'
import { useDispatch, useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'

export default function PokemonDetails () {

    let { id } = useParams()
    const [pokemon, setPokemon] = useState({})
    const [movesNumber, setmovesNumber] = useState(3)
    const [isCatching, setIsCatching] = useState(false)
    const [isCatched, setIsCatched] = useState(true)
    const [nickname, setNickname] = useState('')
    const [open, setOpen] = useState(false)
    const [errNickname, setErrNicknamed] = useState(false)
    const dispatch = useDispatch()
    const [isRedirect, setIsRedirect] = useState(false)

    const GET_POKEMON = gql`
        query {
                pokemon(name: "bulbasaur"){
                sprites{
                    front_default
                }
            }
        }
    `
    const {loading, error, data} = useQuery(GET_POKEMON)
    console.log('pokemon')
    console.log(data)

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

    const catchPokemon = () => {
        setIsCatching(true)
        setTimeout(()=>{
            if( Math.random() < .5 ){
                setIsCatched(true)
            }else{
                setIsCatched(false)
            }
            setOpen(true)
            setIsCatching(false)
        }, 3000)
    }

    const savePokemon = () => {
        if(!nickname){
            setErrNicknamed(true)
        }else{
            dispatch({
                type: 'POKE/ADD',
                payload: {
                    nickname,
                    data: pokemon
                }
            })
            // setOpen(false)
            setIsRedirect(true)
        }
    }

    if(!pokemon.name){
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
                <Loading/>
            </div>
        )
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
            <h1 class="ui header inverted">{title(pokemon.name)}</h1>
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


            <button
                id='catch'
                disabled={isCatching ? true : false}
                onClick={catchPokemon}
                className={
                    cx(
                        "huge ui button",
                        css`
                        position: relative;
                        `
                    )
                }
            >
                {
                    isCatching ? 'Catching Pokemon ...' : 'Catch'
                }
                
                {
                    isCatching ?
                    <div class="ui active inverted dimmer">
                        <div class="ui loader"></div>
                        {/* <div class="ui text loader">Wait...</div> */}
                    </div>
                    : null
                }
            </button>


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
                            margin: 20px 0 5px!important;
                            `
                        )
                    }
                >Abilities</h2>
                <div>
                    {
                        pokemon.abilities?.map((item, index) => {
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
                                    }>{item.ability.name}
                                </h5>
                            )
                        })
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
                        // <div class="ui mini label">
                        //     Mini
                        // </div>
                        <div
                            key='spe'
                            onClick={()=>{setmovesNumber(movesNumber+5)}}
                            className={
                                cx(
                                    "ui label",
                                    css`
                                    margin: 0 0 5px!important;
                                    font-weight: 200!important;
                                    `
                                )
                            }>see more...
                        </div>
                        : null
                    }
                </div>
            </div>

            


            <Modal
                onClose={() => {
                    setOpen(false)
                    setIsRedirect(true)
                }}
                onOpen={() => setOpen(true)}
                open={open}
                // trigger={<Button>Show Modal</Button>}
                >
                <Modal.Header>
                    {
                        isCatched?
                        'Catched!!'
                        : 'Ooops, pokemon has run away'
                    }
                </Modal.Header>
                {
                    isCatched?
                    <Modal.Content image>
                        <Image size='medium' src={pokemon.sprites?.other['dream_world'].front_default} wrapped />
                        <Modal.Description>
                        <Header>Give your pokemon a nickname</Header>
                        <div class="ui input focus">
                            <input
                                type="text"
                                placeholder="Nickname"
                                onChange={(e)=>{
                                    setNickname(e.target.value)
                                }}
                                value={nickname}
                            />
                        </div>
                        {
                            errNickname?
                            <div class="ui warning message">
                                <div class="header">
                                    You must give nickname to your pokemon
                                </div>
                            </div>
                            : null
                        }
                        <p
                            className={
                                css`
                                margin-top: 20px;
                                `
                            }
                        >
                            Your pokemon will be stored in your collection
                        </p>
                        </Modal.Description>
                    </Modal.Content>
                    : null
                }
                <Modal.Actions>
                    {
                        isCatched?
                        <Button color='black' onClick={savePokemon}>
                            Save Pokemon
                        </Button>
                        :
                        <Button color='black' onClick={() => setIsRedirect(true)}>
                            Ok
                        </Button>
                    }
                    {/* <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                    /> */}
                </Modal.Actions>
            </Modal>

            {
                isRedirect?
                <Redirect to='/'/>
                : null
            }
            
        </div>
    )
}