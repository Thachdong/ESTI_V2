import { TabContext, TabList } from '@mui/lab'
import { Box, Tab, Typography } from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/StarOutlineOutlined'
import { BaseButton, EditButton, TabPanelContainForm } from '~modules-core/components'
import { ProductDetailFeedback, ProductDetailGeneral, ProductDetailWebsite } from '~modules-dashboard/components'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { products, TCreateProduct, TUpdateProduct } from 'src/api'
import { toast } from '~modules-core/toast'
import { toastFormError } from '~modules-core/toast/toastFormError'

export const ProductDetailPage: React.FC = () => {
	const [tab, setTab] = useState('general')

	const [isUpdate, setIsUpdate] = useState(false)

	const router = useRouter()

	const { id } = router.query

	const methods = useForm<any>()

	const { isDirty } = methods.formState

	const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: string) => {
		setTab(newValue)
	}, [])

	const disabled = !!id && !isUpdate

	// DATA FETCHING
	const { data: productDetail, refetch } = useQuery(['ProductDetail', id], () => products.getById(id as string).then((res) => res.data), {
		enabled: !!id
	})

	// METHODS
	const mutateAdd = useMutation((payload: TCreateProduct) => products.create(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			router.push('/dashboard/product-manage/products/')
		}
	})

	const handleCreate = useCallback(async (data: any) => {
		const {
			categorys,
			gallery,
			productAttributes,
			suppliers,
			description,
			summary,
			videoUrl,
			specifications,
			metaTitle,
			metaDescriptions,
			metaKeyWords,
			image,
			hidePrice,
			salePrice,
			...rest
		} = data || {}

		const updateGallery = image ? [...gallery, image] : gallery

		const payload = {
			...rest,
			image,
			salePrice: hidePrice ? 'Giá liên hệ' : salePrice,
			productAttributes: productAttributes?.join?.(','),
			suppliers: suppliers?.join?.(','),
			categorys: categorys?.join?.(','),
			productWebsiteCreate: {
				description,
				summary,
				videoUrl,
				gallery: updateGallery?.join?.(','),
				specifications,
				metaTitle,
				metaDescriptions,
				metaKeyWords
			}
		}

		await mutateAdd.mutateAsync(payload)
	}, [])

	const mutateUpdate = useMutation((payload: TUpdateProduct) => products.update(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			refetch()

			setIsUpdate(false)
		}
	})

	const handleUpdate = useCallback(async (data: any) => {
		const {
			categorys,
			gallery,
			productAttributes,
			suppliers,
			description,
			summary,
			videoUrl,
			specifications,
			metaTitle,
			metaDescriptions,
			metaKeyWords,
			image,
			hidePrice,
			salePrice,
			productWebsiteId,
			...rest
		} = data || {}

		const payload = {
			...rest,
			image,
			salePrice: hidePrice ? 'Giá liên hệ' : salePrice,
			productAttributes: productAttributes?.join?.(','),
			suppliers: suppliers?.join?.(','),
			categorys: categorys?.join?.(','),
			productWebsiteUpdate: {
				id: productWebsiteId,
				description,
				summary,
				videoUrl,
				gallery: gallery?.join?.(','),
				specifications,
				metaTitle,
				metaDescriptions,
				metaKeyWords
			}
		}

		await mutateUpdate.mutateAsync(payload)
	}, [])

	const triggerUpdate = useCallback(() => {
		setIsUpdate(true)
	}, [])

	const reverseUpdate = useCallback(() => {
		setIsUpdate(false)
		refetch()
	}, [])
	const onErrorForm = (err: any) => {
		toastFormError(err)
	}
	const renderButtons = useCallback(() => {
		switch (true) {
			case !id:
				return (
					<BaseButton disabled={!isDirty} onClick={methods.handleSubmit(handleCreate, onErrorForm)}>
						Tạo
					</BaseButton>
				)
			case !!id && !isUpdate:
				return <EditButton onClick={triggerUpdate} />
			case !!id && isUpdate:
				return (
					<>
						<BaseButton disabled={!isDirty} onClick={methods.handleSubmit(handleUpdate, onErrorForm)}>
							Cập nhật
						</BaseButton>

						<BaseButton onClick={reverseUpdate} className="bg-main-1 ml-4">
							Hủy
						</BaseButton>
					</>
				)
		}
	}, [id, isUpdate, isDirty])

	// SIDE EFFECTS
	useEffect(() => {
		if (!!productDetail) {
			const { product, productWebsite } = productDetail || {}

			const {
				productName,
				productCode,
				salePrice,
				productGroup,
				categorys,
				manufactor,
				origin,
				unitId,
				suppliers,
				casCode,
				chemicalName,
				specs,
				chemicalAppendix,
				vat,
				productAttributes,
				image,
				warrantyMonth,
				warrantyAddress,
				warrantyContent,
				productBarcode,
				id
			} = product || {}

			let updatedCategory: string[] = []

			if (typeof categorys === 'string') {
				try {
					updatedCategory = JSON.parse(categorys || '[]')?.map?.((c: any) => c?.id)
				} catch {}
			}

			let updatedSupplier: string[] = []

			if (typeof suppliers === 'string') {
				try {
					updatedSupplier = JSON.parse(suppliers || '[]')?.map?.((c: any) => c?.id)
				} catch {}
			}

			let updatedAttributes: string[] = []

			if (typeof productAttributes === 'string') {
				try {
					updatedAttributes = JSON.parse(productAttributes || '[]')?.map?.((c: any) => c?.id)
				} catch {}
			}

			const { videoUrl, metaTitle, metaKeyWords, metaDescriptions, description, summary, specifications, gallery } =
				productWebsite || {}

			methods.reset({
				id,
				productWebsiteId: productWebsite?.id,
				productName,
				productCode,
				salePrice,
				hidePrice: Boolean(salePrice === 'Giá liên hệ'),
				categorys: updatedCategory,
				productGroup,
				manufactor,
				origin,
				unitId,
				suppliers: updatedSupplier,
				casCode,
				chemicalName,
				specs,
				chemicalAppendix,
				vat,
				productAttributes: updatedAttributes,
				image,
				warrantyMonth,
				warrantyAddress,
				warrantyContent,
				videoUrl,
				metaTitle,
				metaKeyWords,
				metaDescriptions,
				description,
				summary,
				specifications,
				productBarcode,
				gallery: gallery?.split(',')
			})
		}
	}, [productDetail])

	return (
		<TabContext value={tab}>
			<Box className="container-center relative col-span-4">
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleTabChange}>
						<Tab label={<Typography>Thông tin cơ bản</Typography>} value="general" />

						<Tab label={<Typography>Website</Typography>} value="website" />

						{!!id && (
							<Tab
								label={
									<Box className="flex items-center">
										<Typography>Đánh giá</Typography>
										<StarIcon color="warning" />
										<StarIcon color="warning" />
										<StarIcon color="warning" />
										<StarIcon color="warning" />
										<StarIcon color="warning" />
									</Box>
								}
								value="feedback"
							/>
						)}
					</TabList>
				</Box>
				<FormProvider {...methods}>
					<Box className="tabpanel-container relative pb-4 pt-2">
						<TabPanelContainForm value="general" index={'general'}>
							<ProductDetailGeneral disabled={disabled} refetch={refetch} />
						</TabPanelContainForm>

						<TabPanelContainForm value="website" index={'website'}>
							<ProductDetailWebsite disabled={disabled} refetch={refetch} isDelete={productDetail?.productWebsite?.deleted} />
						</TabPanelContainForm>

						<TabPanelContainForm value="feedback" index={'feedback'}>
							<ProductDetailFeedback />
						</TabPanelContainForm>
					</Box>

					<Box className="flex justify-end">{renderButtons()}</Box>
				</FormProvider>
			</Box>
		</TabContext>
	)
}
