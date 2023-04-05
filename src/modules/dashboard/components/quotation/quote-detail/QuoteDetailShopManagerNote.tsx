import { Box, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { FormInput } from '~modules-core/components'

type TProps = {
	disabled: boolean
}

export const QuoteDetailShopManagerNote: React.FC<TProps> = ({ disabled }) => {
	const { control } = useFormContext()

	return (
		<Box className="flex flex-col">
			<Typography className="font-bold uppercase mb-4 text-sm">SHOP MANAGER NOTE</Typography>

			<Box className="bg-white grid gap-3 rounded flex-grow p-3">
				<FormInput
					controlProps={{
						name: 'smgNote',
						control: control
					}}
					label="Nhập shop manager note"
					multiline
					minRows={3}
					disabled={disabled}
				/>
			</Box>
		</Box>
	)
}
