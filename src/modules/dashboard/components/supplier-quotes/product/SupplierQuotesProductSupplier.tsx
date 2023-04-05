import { Box, Grid, Typography } from '@mui/material'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { suppliers } from 'src/api'
import { FormInputBase, FormSelectAsync } from '~modules-core/components'
import { productTypes } from '~modules-core/constance'

type TProps = {
	disabled: boolean
}

export const SupplierQuotesProductSupplier: React.FC<TProps> = ({ disabled }) => {
	const [supplier, setSupplier] = useState<any>()

	const { control } = useFormContext()

	const convertProductSupply = useCallback((key: string) => {
		// convert data from [1,2,3] to ["text 1", "text 2", text 3]
		if (!key) return

		const arr = key.split?.(',') || []

		const productGroups = arr.map((item: string) => productTypes.find((t: any) => t.id.toString() === item))

		return _.compact(productGroups)
			.map((prod) => prod.name)
			.join(', ')
	}, [])

	return (
		<>
			<Box className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				<Box className="">
					<Typography className="font-semibold mb-6 text-sm">THÔNG TIN NHÀ CUNG CẤP</Typography>
					<Box className="grid gap-6">
						<FormSelectAsync
							fetcher={suppliers.getList}
							controlProps={{
								name: 'supplierId',
								control,
								rules: { required: 'Phải chọn nhà cung cấp' }
							}}
							callback={(opt) => setSupplier(opt)}
							label="Chọn nhà cung cấp:"
							getOptionLabel={(supplier: any) => (!!supplier ? supplier?.supplierCode + ' - ' + supplier?.supplierName : '')}
							disabled={disabled}
							shrinkLabel
						/>

						<FormInputBase
							value={convertProductSupply(supplier?.productSupply)}
							label="Nhóm sản phẩm cung cấp:"
							disabled
							shrinkLabel
						/>

						<FormInputBase value={supplier?.taxCode} label="Mã số thuế:" disabled shrinkLabel />

						<FormInputBase value={supplier?.address} label="Địa chỉ:" disabled shrinkLabel />
					</Box>
				</Box>

				<Box className="">
					<Typography className="font-semibold text-sm mb-6">THÔNG TIN LIÊN HỆ</Typography>
					<Box className="grid gap-6">
						<FormInputBase value={supplier?.curatorName} label="Người phụ trách:" disabled shrinkLabel />

						<FormInputBase value={supplier?.curatorPositionName} label="Chức vụ:" disabled shrinkLabel />

						<FormInputBase value={supplier?.curatorPhone} label="Điện thoại:" disabled shrinkLabel />

						<FormInputBase value={supplier?.curatorEmail} label="Email:" disabled shrinkLabel />
					</Box>
				</Box>
			</Box>
		</>
	)
}
