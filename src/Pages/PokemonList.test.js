import { findByTestId, fireEvent, render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import PokemonList from './PokemonList'

describe("Homepage Testing", () => {
    it("Testing Pokemons Display", async () => {
        const { findAllByTestId, getByTestId, debug, findByTestId } = render(
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <PokemonList/>
                </BrowserRouter>
            </ApolloProvider>    
        )
        const world = getByTestId("world")
        // debug(world)
        // await waitFor (() => {
        //     const pokemons = getByTestId("pokemon-list")
        //     debug(world)
        // })
        await findAllByTestId("pokemon-list", undefined, { timeout: 5000 })
        // debug(world)
        let count = world.childElementCount
        // console.log('how many pokemons')
        // console.log(count)
        expect(count).toBe(20)
        let buttonLoad = getByTestId('button-more-pokemons')
        fireEvent.click(buttonLoad)
        let buttonLoadAppear = await findByTestId('button-more-pokemons', undefined, { timeout: 5000 })
        // debug(buttonLoadAppear)
        // console.log(world.childElementCount)
        // console.log(count)
        count = world.childElementCount
        expect(count).toBe(30)

    })
})