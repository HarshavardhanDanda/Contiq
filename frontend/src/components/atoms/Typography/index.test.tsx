import { render, screen } from '@testing-library/react'
import TypographyComponent from '.';
import "@testing-library/jest-dom";

describe('TypographyComponent', () => {
  it('renders with default props', () => {
    render(<TypographyComponent>Default Text</TypographyComponent>)
    const typographyElement = screen.getByText('Default Text')
    expect(typographyElement).toBeInTheDocument()
  })

  it('renders with custom variant and color', () => {
    render(
      <TypographyComponent variant="h4" color="secondary">
        Custom Text
      </TypographyComponent>
    )
    const typographyElement = screen.getByText('Custom Text')
    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement).toHaveClass('MuiTypography-h4')
  })
})
