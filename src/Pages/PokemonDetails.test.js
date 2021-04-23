import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter, Route, MemoryRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { title } from '../supports/format'
import store from '../redux'
import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import PokemonDetails from './PokemonDetails'
import Home from './PokemonList'
import Collection from './Collection'
import App from '../App'

const Page = <Provider store={store}>
<ApolloProvider client={client}>
    <BrowserRouter>
        <MemoryRouter initialEntries={['/details/ivysaur']}>
            <App/>
        </MemoryRouter>
    </BrowserRouter>
</ApolloProvider>
</Provider>

const { getByTestId, findByTestId, queryByTestId, getByText, queryByText } = render(Page)

describe("Page Pokemon Details Testing", () => {

    it("Testing Catch Pokemon", async () => {
        let loading = getByTestId("page-details-loading")
        expect(loading).toBeInTheDocument()
        
        await findByTestId("details", undefined, { timeout: 5000 })

        let details = getByTestId("details")
        expect(details).toBeInTheDocument()

        let buttonCatch = getByTestId("button-catch")
        expect(buttonCatch).toBeInTheDocument()

        fireEvent.click(buttonCatch)

        await findByTestId("catch-result", undefined, { timeout: 2000 })

        if(queryByTestId("success")){
            let testingPokemonNickName = 'testing1234'
            console.log('pokemon is catched')
            let nickname = getByTestId("nickname")

            fireEvent.change(nickname, {
                target: { value: testingPokemonNickName }
            })

            let buttonSavePokemon = getByTestId("button-save-pokemon")
            expect(buttonSavePokemon).toBeInTheDocument()

            fireEvent.click(buttonSavePokemon)

            await findByTestId("collection")
            let collection = getByTestId("collection")
            expect(collection).toBeInTheDocument()
            let newPokemon = getByText(title(testingPokemonNickName))
            expect(newPokemon).toBeInTheDocument()
            let buttonRelease = getByTestId('button-release')

            fireEvent.click(buttonRelease)

            let pokemonReleased = queryByText(title(testingPokemonNickName))
            expect(pokemonReleased).toBeNull()
        }

        if(queryByTestId("fail")){
            console.log('pokemon escaped')
            let buttonFailOk = getByTestId("button-fail-ok")

            fireEvent.click(buttonFailOk)

            await findByTestId("world")
            let world = getByTestId("world")
            expect(world).toBeInTheDocument()
        }
    })
})