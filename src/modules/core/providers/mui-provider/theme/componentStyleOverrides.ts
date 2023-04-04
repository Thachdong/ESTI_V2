import { Components } from '@mui/material/styles/components'
import { ComponentsProps } from '@mui/material'
import { ComponentsOverrides } from '@mui/material'
import { ComponentsVariants } from '@mui/material'
const componentStyleOverrides = (): Components => ({
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			variant: 'contained',
			size: 'medium'
		},
		styleOverrides: {
			root: {
				letterSpacing: '0.04em',
				textTransform: 'none',
				borderRadius: '4px',
				fontWeight: 'bold'
			}
		},
		variants: [
			{
				props: { size: 'large' },
				style: {
					padding: '11px 24px',
					lineHeight: '17px'
				}
			},
			{
				props: { size: 'medium' },
				style: {
					// height: '40.5px',
					padding: '12px 20px',
					fontSize: '18px',
					lineHeight: '23px'
					// lineHeight: '17px'
				}
			},
			{
				props: { size: 'small' },
				style: {
					height: '40px',
					padding: '11px 16px',
					lineHeight: '18px',
					fontSize: '14px'
				}
			}
		]
	}
})
export default componentStyleOverrides
declare module '@mui/material/styles/components' {
	interface Components<Theme = unknown> {
		MuiLoadingButton?: {
			styleOverrides?: {
				loadingIndicator?: any
			}
		}
	}
}
