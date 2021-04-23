import { render } from '@testing-library/react'
import Collection from './Collection'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe("testing", () => {
    it("describing it", () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/collection']}>
                <App/>
            </MemoryRouter>
        )
        let collection = getByTestId("collection")
        expect(collection).toBeInTheDocument()
    })
})