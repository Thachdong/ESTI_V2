import { Box, Typography } from '@mui/material'
import { FormInputBase } from '~modules-core/components'

type TProps = {
	contactData: any
}

export const QuoteDetailViewContact: React.FC<TProps> = ({ contactData }) => {
	return (
		<Box className="flex flex-col">
			<Typography className="font-bold uppercase mb-4 text-sm">thông tin liên hệ</Typography>

			<Box className="bg-white rounded grid gap-3 p-3">
				<FormInputBase label="Người phụ trách" disabled={true} value={contactData?.curatorName} />

				<FormInputBase label="Phòng ban" disabled={true} value={contactData?.curatorDepartmentName} />

				<FormInputBase label="Điện thoại" disabled={true} value={contactData?.curatorPhone} />

				<FormInputBase label="Email" disabled={true} value={contactData?.curatorEmail} />
			</Box>
		</Box>
	)
}
