import { Box, Typography } from '@mui/material'
import styles from '~modules-dashboard/styles/layout/footer.module.css'

export const Footer: React.FC = () => (
	<Box className={styles['footer']}>
		<Typography className="text-xs !bg-none">Designed and developed by Mona Media</Typography>
	</Box>
)
