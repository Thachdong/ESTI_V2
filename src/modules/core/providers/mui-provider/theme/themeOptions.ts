import { ThemeOptions } from '@mui/material'
import componentStyleOverrides from './componentStyleOverrides'

const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: 'light'
	},
	typography: {
		fontFamily: ['Be Vietnam Pro', 'ui-sans-serif', 'system-ui'].join(',')
	},
	components: componentStyleOverrides()
}

const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: 'dark'
	}
}

export const themeOptions = {
	lightThemeOptions,
	darkThemeOptions
}
