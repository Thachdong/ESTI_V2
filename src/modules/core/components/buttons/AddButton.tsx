import AddIcon from '@mui/icons-material/Add'
import { Button, ButtonProps } from '@mui/material'
import clsx from 'clsx'

export const AddButton: React.FC<ButtonProps> = ({ ref, ...props }) => {
	return (
		<Button
			variant="contained"
			{...props}
			size="small"
			className={clsx('!bg-main hover:bg-[#3182ce] shadow-none', props.disabled && 'disable-btn !bg-[#a6a3a3]', props?.className)}
			// className={clsx(
			//   "!bg-main hover:bg-[#3182ce] px-3 shadow-none !font-semibold h-[40px] min-w-[150px]",
			//   props.disabled && "disable-btn !bg-[#a6a3a3]",
			//   props?.className
			// )}
		>
			<AddIcon />
			{props?.children && <span className="truncate ml-2">{props?.children}</span>}
		</Button>
	)
}
