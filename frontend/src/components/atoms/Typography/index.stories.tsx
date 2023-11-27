import React from 'react'
import { type StoryFn, type Meta } from '@storybook/react'
import TypographyComponent, { type TypographyComponentProps } from '.'

export default {
  title: 'atoms/Typography',
  component: TypographyComponent
} as Meta

const Template: StoryFn<TypographyComponentProps> = (args) => (
  <TypographyComponent {...args} />
)

export const heading1 = Template.bind({})
heading1.args = {
  variant: 'h1',
  children: 'h1 Typography'
}

export const heading2 = Template.bind({})
heading2.args = {
  variant: 'h2',
  children: 'h2 Typography'
}

export const heading3 = Template.bind({})
heading3.args = {
  variant: 'h3',
  children: 'h3 Typography'
}

export const subtitle1 = Template.bind({})
subtitle1.args = {
  variant: 'subtitle1',
  children: 'subtitle1 Typography'
}

export const subtitle2 = Template.bind({})
subtitle2.args = {
  variant: 'subtitle2',
  children: 'subtitle2 Typography'
}

export const body1 = Template.bind({})
body1.args = {
  variant: 'body1',
  children: 'body1 Typography'
}

export const caption1 = Template.bind({})
caption1.args = {
  variant: 'caption',
  children: 'caption Typography'
}

export const CustomVariantAndColor = Template.bind({})
CustomVariantAndColor.args = {
  variant: 'h3',
  color: 'secondary',
  children: 'Custom Variant and Color'
}
