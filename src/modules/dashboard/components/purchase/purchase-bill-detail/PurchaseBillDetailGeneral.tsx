import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { purchaseOrder } from 'src/api'
import { FormInput, FormInputBase, FormSelectAsync } from '~modules-core/components'

type TProps = {
	purchaseData: any
}

export const PurchaseBillDetailGeneral: React.FC<TProps> = ({ purchaseData }) => {
	const { control } = useFormContext()

	const { id } = useRouter().query

	return (
		<Box>
			<Typography className="font-bold uppercase mb-4 text-sm">THÔNG TIN CHUNG</Typography>

			<Box className="grid lg:grid-cols-2 gap-4 bg-white rounded p-3">
				<FormSelectAsync
					controlProps={{
						name: 'productOrderId',
						control,
						rules: { required: 'Phải chọn đơn mua hàng' }
					}}
					label="Mã đơn mua hàng:"
					labelKey="code"
					fetcher={purchaseOrder.getList}
					disabled={!!id}
				/>

				<FormInput
					controlProps={{
						name: 'billNumber',
						control,
						rules: { required: 'Phải nhập số hóa đơn' }
					}}
					label="Số hóa đơn:"
					disabled={!!id}
				/>

				<FormInputBase label="Sale admin:" value={purchaseData?.salesAdminCode} disabled />

				<FormInputBase label="Mã chi nhánh:" value={purchaseData?.branchCode} disabled />
			</Box>
		</Box>
	)
}
