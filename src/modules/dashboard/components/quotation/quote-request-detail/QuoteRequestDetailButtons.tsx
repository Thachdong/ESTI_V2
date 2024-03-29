import { Box } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useReactToPrint } from 'react-to-print'
import { TCreateQuoteRequest, TUpdateQuoteRequest, preOrderApi } from 'src/api'
import { AddButton, BaseButton, EditButton, PrintButton, ViewButton } from '~modules-core/components'
import { toast } from '~modules-core/toast'
import { PrintQuoteRequest } from './PrintQuoteRequest'

type TProps = {
	isUpdate: boolean
	setIsUpdate: Dispatch<SetStateAction<boolean>>
	refetch: () => void
	requestDetail: any
}

export const QuoteRequestDetailButtons: React.FC<TProps> = ({ isUpdate, setIsUpdate, refetch, requestDetail }) => {
	// EXTRACT PROPS
	const router = useRouter()

	const { id } = router.query

	const { handleSubmit, watch } = useFormContext()

	const { status } = watch()

	// METHODS
	const mutateCreate = useMutation((payload: TCreateQuoteRequest) => preOrderApi.create(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			router.push('/dashboard/quotation/quote-request')
		}
	})

	const handleCreate = useCallback(async (data: any) => {
		const { products = [], attachFile = [], customerAvailable, ...rest } = data || {}

		const payload = {
			...rest,
			attachFile: attachFile.join(','),
			preOrderDetailCreate: products.map((prod: any) => ({
				productId: prod?.id,
				quantity: prod?.quantity,
				note: prod?.note
			}))
		}

		await mutateCreate.mutateAsync(payload)
	}, [])

	const mutateUpdate = useMutation((payload: TUpdateQuoteRequest) => preOrderApi.update(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			setIsUpdate(false)

			refetch?.()
		}
	})

	const handleUpdate = useCallback(async (data: any) => {
		const { salesId, curatorId, customerId } = data || {}

		await mutateUpdate.mutateAsync({
			id: id as string,
			salesId,
			curatorId,
			customerId
		})
	}, [])

	const printAreaRef = useRef<HTMLTableElement>(null)
	const handlePrint = useReactToPrint({
		content: () => printAreaRef.current,
		pageStyle: `
      @page {
        size: 210mm 297mm;
      }
    `
	})

	const renderButtons = useCallback(() => {
		switch (true) {
			case !id:
				return <AddButton onClick={handleSubmit(handleCreate)}>Tạo yêu cầu</AddButton>
			case !!id && isUpdate:
				return (
					<>
						<BaseButton onClick={handleSubmit(handleUpdate)}>Cập nhật</BaseButton>
						<BaseButton className="!bg-main-1 ml-3" onClick={() => setIsUpdate(false)}>
							Quay lại
						</BaseButton>
					</>
				)
			case !!id && !isUpdate:
				return (
					<Box className="flex items-center justify-end gap-3">
						{status === 0 ? (
							<>
								<EditButton tooltipText="Cập nhật" onClick={() => setIsUpdate(true)} />

								<AddButton onClick={() => router.push(`quote-detail?fromRequestId=${id}`)}>Tạo báo giá</AddButton>
							</>
						) : (
							<ViewButton variant="contained" className="bg-main !text-white" tooltipText="Xem báo giá">
								<Link
									// href={{
									// 	pathname: '/dashboard/quotation/quote-detail',
									// 	query: { id: requestDetail?.preOrderView?.preQuoteId }
									// }}
									// passHref
									href={`/dashboard/quotation/quote-detail/?id=${requestDetail?.preOrderView?.preQuoteId}`}
								>
									<a className="text-white no-underline">Xem báo giá</a>
								</Link>
							</ViewButton>
						)}
						<PrintButton className="!bg-error" onClick={handlePrint}>
							In
						</PrintButton>
						<Box className="hidden">
							<PrintQuoteRequest printAreaRef={printAreaRef} defaultValue={requestDetail} />
						</Box>
					</Box>
				)
		}
	}, [id, isUpdate, status, requestDetail])

	return <Box className="flex justify-end mt-4">{renderButtons()}</Box>
}
