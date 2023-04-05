import { InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { productAtribute, products, suppliers, units } from 'src/api'
import {
	AddButton,
	BaseButton,
	FormCategory,
	FormCheckbox,
	FormInput,
	FormInputNumber,
	FormSelect,
	FormSelectAsync,
	FormUploadBase
} from '~modules-core/components'
import { VAT } from '~modules-core/constance'
import { toast } from '~modules-core/toast'

type TProps = {
	disabled: boolean
	refetch?: () => void
}

export const General: React.FC<TProps> = ({ disabled, refetch }) => {
	const { control, watch, setValue } = useFormContext()

	const { image } = watch()

	const { hidePrice, productGroup, productCode, barcode } = watch()

	// DATA FETCHING
	const { data: productGroups } = useQuery(['productGroups'], () => products.getProductGroups().then((res) => res.data))

	// METHODS
	const mutateCreateBarcode = useMutation((productCode: string) => products.createBarcode(productCode), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			refetch?.()
		}
	})

	const handleCreateBarcode = useCallback(async () => {
		await mutateCreateBarcode.mutateAsync(productCode)
	}, [productCode])

	// SIDE EFFECTS
	useEffect(() => {
		setValue
	}, [hidePrice])

	const renderTitle = (loading: boolean) => (
		<BaseButton tooltipText="Tải ảnh">
			<InputLabel className="text-white" htmlFor="image" disabled={loading}>
				Tải Ảnh
			</InputLabel>
		</BaseButton>
	)

	return (
		<Box className="mt-4">
			<Box className="flex items-center justify-between mb-3">
				<Typography className="font-bold uppercase text-sm">Thông tin chung</Typography>

				{!!barcode ? (
					<img src={barcode} alt="barcode" height={40} />
				) : (
					<AddButton onClick={handleCreateBarcode}>Tạo mã vạch</AddButton>
				)}
			</Box>

			<Box className="grid lg:grid-cols-2 gap-4 bg-white shadow p-4">
				<FormInput
					controlProps={{
						control,
						name: 'productName',
						rules: { required: 'Phải nhập tên SP' }
					}}
					label="Tên SP"
					disabled={disabled}
				/>

				<FormCheckbox
					controlProps={{
						control,
						name: 'hidePrice'
					}}
					label={'Ẩn giá bán'}
					disabled={disabled}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'productCode',
						rules: { required: 'Phải nhập mã SP' }
					}}
					label="Mã SP"
					disabled={disabled}
				/>

				{!hidePrice && (
					<FormInputNumber
						controlProps={{
							control,
							name: 'salePrice'
						}}
						label="Giá bán"
						disabled={disabled}
					/>
				)}

				<FormSelect
					options={productGroups}
					controlProps={{
						control,
						name: 'productGroup',
						rules: { required: 'Phải chọn nhóm SP' }
					}}
					label="Nhóm SP"
					disabled={disabled}
					className="flex-grow"
				/>

				<FormCategory
					controlProps={{
						control,
						name: 'categorys',
						rules: { required: 'Phải chọn danh mục sản phẩm' }
					}}
					label="Danh mục SP"
					multiple={true}
					disabled={disabled}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'manufactor',
						rules: { required: 'Phải nhập hãng sản xuất' }
					}}
					label="Hãng sản xuất"
					disabled={disabled}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'origin',
						rules: { required: 'Phải nhập xuất xứ' }
					}}
					label="Xuất xứ"
					disabled={disabled}
				/>

				<FormSelectAsync
					fetcher={units.getList}
					controlProps={{
						control,
						name: 'unitId',
						rules: { required: 'Phải chọn đơn vị tính' }
					}}
					label="Đơn vị tính"
					disabled={disabled}
					labelKey="unitName"
				/>

				<FormSelectAsync
					fetcher={suppliers.getList}
					controlProps={{
						control,
						name: 'suppliers',
						rules: { required: 'Phải chọn nhà cung cấp' }
					}}
					label="Nhà cung cấp"
					disabled={disabled}
					multiple={true}
					labelKey="supplierCode"
					getOptionLabel={(opt: any) => (!!opt ? `${opt.supplierCode} - ${opt.supplierName}` : '')}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'casCode'
					}}
					label="Mã CAS"
					disabled={disabled}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'chemicalName'
					}}
					label="Công thức hóa học"
					disabled={disabled}
				/>

				<FormInput
					controlProps={{
						control,
						name: 'specs'
					}}
					label="Quy cách"
					disabled={disabled}
				/>

				{/* api yêu cầu chỉ hiển thị phụ lục hóa chất khi productGroup là Hóa chất
          productGroupId: dc039924-e248-4285-8d1a-786b3841d9b6
        */}
				{/* update1 theo yêu cầu của api:
            chỉ hiển thị phụ lục hóa chất khi productGroup.name === "Hóa chất"
         */}
				{productGroups?.find((group: any) => group?.id === productGroup)?.name === 'Hóa chất' && (
					<FormInput
						controlProps={{
							control,
							name: 'chemicalAppendix'
						}}
						label="Phụ lục HC"
						disabled={disabled}
					/>
				)}

				<FormSelect
					controlProps={{
						control,
						name: 'vat',
						rules: { required: 'Vui lòng nhập thuế' }
					}}
					label="Thuế GTGT"
					disabled={disabled}
					options={VAT}
				/>

				<Box className="flex flex-col">
					<Box className="mb-3">
						<FormUploadBase
							loader={products.uploadImage}
							controlProps={{ control, name: 'image' }}
							disabled={disabled}
							renderTitle={renderTitle}
						/>
					</Box>

					{image && <img src={image} alt="product" width={200} />}
				</Box>

				<FormSelectAsync
					fetcher={productAtribute.getList}
					controlProps={{
						control,
						name: 'productAttributes'
					}}
					label="Thuộc tính"
					disabled={disabled}
					multiple
					getOptionLabel={(opt: any) => (!!opt ? `${opt.productAttributesName} - ${opt.productAttributesCode}` : '')}
				/>
			</Box>
		</Box>
	)
}
