import { StyleService, useStyleSheet } from '@ui-kitten/components'

/*
 *  Contains all light/dark mode dynamic styles for named elements/use case
 */

const themeStyleMap = StyleService.create({
  svg: {
    fill: 'text-basic-color'
  },
  header: {
    headerTintColor: 'text-basic-color',
  },
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  screen: {
    backgroundColor: 'background-basic-color-3',
  },
  quote: {
    backgroundColor: 'background-basic-color-2',
    // border: 'background-basic-color-2',
  }
})


export default themeStyleMap
