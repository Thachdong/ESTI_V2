import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { staff } from 'src/api'
import { FormInputBase, FormSelect } from '~modules-core/components'

type TProps = {
	data: any
	disabled: boolean
}

export const QuoteDetailGeneralView: React.FC<TProps> = ({ data, disabled }) => {
	const { control } = useFormContext()

	// DATA FETCHING
	const { data: saleStaff } = useQuery(['saleStaffList'], () => staff.getListSale().then((res) => res.data))

	return (
		<Box className="flex flex-col">
			<Typography className="font-bold uppercase mb-4 text-sm">THÔNG TIN CHUNG</Typography>

			<Box className="grid lg:grid-cols-2 gap-4 bg-white rounded p-3">
				<FormInputBase label="Mã YCBG" value={data?.preOrderCode || '__'} disabled />

				<FormInputBase
					label="Ngày YC"
					value={data?.preOrderCreated ? moment(data?.preOrderCreated).format('DD/MM/YYYY') : '__'}
					disabled
				/>

				<FormInputBase label="Mã BG" value={data?.preQuoteCode} disabled />

				<FormInputBase label="Ngày BG" value={moment(data?.created).format('DD/MM/YYYY')} disabled />

				<FormSelect
					options={saleStaff || []}
					label="Sales phụ trách"
					controlProps={{
						name: 'salesId',
						control,
						rules: { required: 'Phải chọn sale phụ trách' }
					}}
					getOptionLabel={(opt: any) => (!!opt ? `${opt?.code} - ${opt?.fullName}` : '')}
					disabled={disabled}
				/>

				<FormInputBase label="CN thực hiện" value={data?.performBanchCode} disabled />
			</Box>
		</Box>
	)
}
