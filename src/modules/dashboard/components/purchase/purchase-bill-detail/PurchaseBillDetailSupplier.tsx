import { Box, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { suppliers } from 'src/api'
import { FormInput, FormInputBase } from '~modules-core/components'
import { productTypes } from '~modules-core/constance'

export const PurchaseBillDetailSupplier: React.FC = () => {
	const { watch } = useFormContext()

	const { supplierId } = watch()

	// DATA FETCHING
	const { data: supplierDetail } = useQuery(['supplierDetail', supplierId], () => suppliers.getById(supplierId).then((res) => res.data), {
		enabled: !!supplierId
	})

	// METHODS
	const convertProductSupply = useCallback((key: string) => {
		if (typeof key === 'string' && !!key) {
			return key
				.split(',')
				?.map((item: string) => productTypes[+item + 1]?.name)
				?.join(', ')
		}
	}, [])

	return (
		<Box className="grid lg:grid-cols-2 gap-6 ">
			<Box className="flex flex-col">
				<Typography className="font-bold uppercase mb-4 text-sm">THÔNG TIN NHÀ CUNG CẤP</Typography>

				<Box className="bg-white grid gap-3 rounded flex-grow p-3">
					{/* <FormInput  controlProps={{
							name: "plan",
							control: control,
						}}
						label={"Kế hoạch thực hiện"}
						multiline
						minRows={3}
						disabled={disabled}
						shrinkLabel  /> */}
					<FormInputBase label="Nhà cung cấp:" value={supplierDetail?.supplierCode} disabled />

					<FormInputBase label="Địa chỉ:" value={supplierDetail?.address} disabled />

					<FormInputBase label="Mã số thuế:" value={supplierDetail?.taxCode} disabled />

					<FormInputBase label="Nhóm sản phẩm cung cấp:" value={convertProductSupply(supplierDetail?.productSupply)} disabled />
				</Box>
			</Box>

			<Box className="flex flex-col">
				<Typography className="font-bold uppercase mb-4 text-sm">THÔNG TIN LIÊN HỆ</Typography>

				<Box className="bg-white grid gap-3 rounded flex-grow p-3">
					<FormInputBase label="Người phụ trách:" value={supplierDetail?.curatorName} disabled />

					<FormInputBase label="Chức vụ:" value={supplierDetail?.curatorPositionName} disabled />

					<FormInputBase label="Điện thoại:" value={supplierDetail?.curatorPhone} disabled />

					<FormInputBase label="Email:" value={supplierDetail?.curatorEmail} disabled />
				</Box>
			</Box>
		</Box>
	)
}
