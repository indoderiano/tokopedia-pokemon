import { fireEvent, queryByTestId, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import PokemonList from './PokemonList'
import App from '../App'

describe("Homepage Testing", () => {
    it("Testing Pokemons Display", async () => {
        const { findAllByTestId, getByTestId, findByTestId, getAllByTestId } = render(
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProvider>    
        )
        const world = getByTestId("world")
        await findAllByTestId("pokemon-list", undefined, { timeout: 5000 })
        let count = world.childElementCount
        expect(count).toBe(20)
        let buttonLoad = getByTestId('button-more-pokemons')
        expect(buttonLoad).toBeInTheDocument()

        fireEvent.click(buttonLoad)

        let buttonLoadAppear = await findByTestId('button-more-pokemons', undefined, { timeout: 5000 })

        expect(buttonLoadAppear).toBeInTheDocument()
        count = world.childElementCount
        expect(count).toBe(30)
        
        let AllPoke = getAllByTestId('poke-normal')
        expect(AllPoke[0]).toBeInTheDocument()
        let selectCovid = getByTestId('select-covid')

        fireEvent.click(selectCovid)

        AllPoke = getAllByTestId('poke-covid')
        expect(AllPoke[0]).toBeInTheDocument()


    })
})