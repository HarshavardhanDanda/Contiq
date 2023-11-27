import { screen } from "@testing-library/react"
import SignUpPage from "."
import { SIGNUP } from "../../constants"
import { render } from "../../test-setup"

describe("SignUp component",()=>{
    test("renders sign up component",()=>{
        render(<SignUpPage/>)
        expect(screen.getByText(SIGNUP)).toBeInTheDocument;
    })
})