import AddIcon from '@mui/icons-material/Add'
import { Button, ButtonProps } from '@mui/material'
import clsx from 'clsx'

export const AddButton: React.FC<ButtonProps> = ({ ref, ...props }) => {
	return (
		<Button
			variant="contained"
			size="small"
			{...props}
			className={clsx('shadow-none', props?.className)}
			// className={clsx(
			//   "!bg-main hover:bg-[#3182ce] px-3 shadow-none !font-semibold h-[40px] min-w-[150px]",
			//   props.disabled && "cursor-not-allowed",
			//   props?.className
			// )}
		>
			<AddIcon />
			{props?.children && <span className="truncate ml-2">{props?.children}</span>}
		</Button>
	)
}
