import { findByTestId, fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux'
import { ApolloProvider } from '@apollo/client/react'
import client from '../config/graphql'
import PokemonDetails from './PokemonDetails'

describe("Page Pokemon Details Testing", () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        useParams: () => ({
          name: 'ivysaur'
        }),
        // useRouteMatch: () => ({ url: '/details/ivysaur' }),
      }));
    // jest.mock('react-router', () => ({
    //     useParams: jest.fn().mockReturnValue({ name: 'ivysaur' }),
    //   }));
    it("Testing Catch Button", async () => {
        const { findAllByTestId, getByTestId, debug, findByTestId, queryByTestId } = render(
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <Route exact path='/details/:name'>
                            <PokemonDetails/>
                        </Route>
                    </BrowserRouter>
                </ApolloProvider>
            </Provider>
        )
        await findByTestId("container")
        debug(getByTestId("container"))
        // await findByTestId("button-catch")
        // debug(getByTestId("container"))
        // debug(getByTestId("button-catch"))

        debug(getByTestId("page-details-loading"))
        // await waitForElementToBeRemoved(() => {
        //     queryByTestId("page-details-loading")
        // })

        // const buttonCatch = getByTestId("button-catch")
        // expect(buttonCatch).toBeInTheDocument()
        
        // const world = getByTestId("world")
        // debug(world)
        // await waitFor (() => {
        //     const pokemons = getByTestId("pokemon-list")
        //     debug(world)
        // })
        // await findAllByTestId("pokemon-list", undefined, { timeout: 5000 })
        // debug(world)
        // let count = world.childElementCount
        // console.log('how many pokemons')
        // console.log(count)
        // expect(count).toBe(20)
        // let buttonLoad = getByTestId('button-more-pokemons')
        // fireEvent.click(buttonLoad)
        // let buttonLoadAppear = await findByTestId('button-more-pokemons', undefined, { timeout: 5000 })
        // debug(buttonLoadAppear)
        // console.log(world.childElementCount)
        // console.log(count)
        // count = world.childElementCount
        // expect(count).toBe(30)

    })
})