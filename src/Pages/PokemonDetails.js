import React, { useEffect, useState, useContext } from 'react'
import ThemeContext from '../context'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { useParams, Redirect } from 'react-router'
import {title} from '../supports/format'
import Loading from '../Components/Loading'
import axios from 'axios'
import { css, cx } from '@emotion/css'
import { gql, useQuery } from '@apollo/client'

export default function PokemonDetails () {

    let { name } = useParams()
    const {theme} = useContext(ThemeContext)
    const [pokemon, setPokemon] = useState({})
    const [movesNumber, setmovesNumber] = useState(3)
    const [isCatching] = useState(false)
    const [isCatched, setIsCatched] = useState(true)
    const [nickname, setNickname] = useState('')
    const [open, setOpen] = useState(false)
    const [errNickname, setErrNicknamed] = useState(false)
    const [redirect, setRedirect] = useState('')
    // const {list} = useSelector(state => state)
    const list = JSON.parse(localStorage.getItem('pokemon-collection')) || []

    const GET_POKEMON = gql`
        query {
                pokemon(name: "${name}"){
                    name
                    sprites{
                        front_default
                    }
                    types{
                        type{
                            name
                        }
                    }
                    base_experience
                    height
                    abilities{
                        ability{
                            name
                        }
                    }
                    moves{
                        move{
                            name
                        }
                    }
            }
        }
    `
    const {loading, error, data} = useQuery(GET_POKEMON)
    

    useEffect(()=>{
        // One particular nice image needs to be extracted from this API Request
        // which does not exist from GraphQL
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            setPokemon(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[name])

    const catchPokemon = () => {
        // setIsCatching(true)
        
        if( Math.random() < .5 ){
            setIsCatched(true)
        }else{
            setIsCatched(false)
        }
        setOpen(true)
        // setIsCatching(false)
            
    }

    const savePokemon = () => {

        // Check for other nicknames
        let check = true
        list.forEach(poke => {
            if(poke.nickname.toLowerCase() === nickname.toLowerCase()){
                check = false
            }
        })

        if(!nickname){
            setErrNicknamed('You must give nickname to your pokemon')
        }else if(!check){
            setErrNicknamed(`There is already "${nickname}" in your collection`)
        }else{
            let newPokemon = {
                nickname,
                data: data.pokemon
            }
            localStorage.setItem('pokemon-collection', JSON.stringify([...list, newPokemon]))
            // dispatch({
            //     type: 'POKE/ADD',
            //     payload: newPokemon
            // })
            
            setRedirect('/collection')
        }
    }

    if(error){
        return (
            <div>
                Error
            </div>
        )
    }

    if(loading){
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
                data-testid="page-details-loading"
            >
                <Loading/>
            </div>
        )
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
            data-testid="details"
        >
            <h1 className="ui header inverted">{title(data.pokemon.name)}</h1>
            <div
                className={
                    css`
                    min-height: 300px;
                    `
                }
            >
                {/* ============================== */}
                {/* This one particular nice image */}
                {/* ============================== */}
                <img
                    alt="poke-art"
                    className={
                    cx(
                        "ui medium rounded image",
                        css`
                        margin: auto;
                        `
                    )
                    }
                    src={pokemon.sprites? pokemon.sprites.other['official-artwork'].front_default : data.pokemon.sprites?.front_default}/>
            </div>


            <button
                disabled={isCatching ? true : false}
                onClick={catchPokemon}
                className={
                    cx(
                        "huge ui button",
                        css`
                        position: relative;
                        margin-top: 20px!important;
                        `
                    )
                }
                data-testid="button-catch"
            >
                {
                    isCatching ? 'Catching Pokemon ...' : 'Catch'
                }
                
                {
                    isCatching ?
                    <div className="ui active inverted dimmer">
                        <div className="ui loader"></div>
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

            <h2 className="ui header inverted">Base Experience</h2>
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

            <h2 className="ui header inverted">Height</h2>
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
                            return null
                        })
                    }
                    
                    {
                        pokemon.moves?.length-1 > movesNumber?
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
                    setRedirect('/')
                }}
                onOpen={() => setOpen(true)}
                open={open}
                data-testid="catch-result"
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
                    <Modal.Content image data-testid="success">
                        <Image size='medium' src={pokemon.sprites? pokemon.sprites?.other['dream_world'].front_default : data.pokemon.sprites?.front_default} wrapped />
                        <Modal.Description>
                        <Header>Give your pokemon a nickname</Header>
                        <div className="ui input focus">
                            <input
                                type="text"
                                placeholder="Nickname"
                                onChange={(e)=>{
                                    setNickname(e.target.value)
                                }}
                                value={nickname}
                                data-testid="nickname"
                            />
                        </div>
                        {
                            errNickname?
                            <div className="ui warning message">
                                <div className="header">
                                    {errNickname}
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
                    : 
                    <Modal.Content image data-testid="fail">
                        <Image
                            className={
                                css`
                                margin: auto
                                `
                            }
                            size='medium' src='https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png' wrapped />
                        
                    </Modal.Content>
                }
                <Modal.Actions>
                    {
                        isCatched?
                        <Button color='black' onClick={savePokemon} data-testid="button-save-pokemon">
                            Save Pokemon
                        </Button>
                        :
                        <Button color='black' onClick={() => setRedirect('/')} data-testid="button-fail-ok">
                            Ok
                        </Button>
                    }
                </Modal.Actions>
            </Modal>

            {
                redirect?
                <Redirect to={redirect}/>
                : null
            }
            
        </div>
    )
}