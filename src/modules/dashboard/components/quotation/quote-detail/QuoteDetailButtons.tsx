import { Box } from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useReactToPrint } from 'react-to-print'
import { preQuote, TCreatePreQuote, TUpdatePreQuote } from 'src/api'
import { AddButton, BaseButton, EditButton, PrintButton, SendButton, SendMailDialog } from '~modules-core/components'
import { toast } from '~modules-core/toast'
import { TDefaultDialogState } from '~types/dialog'
import { PrintQuoteDetail } from './PrintQuoteDetail'
import { toastFormError } from '~modules-core/toast/toastFormError'

type TProps = {
	isUpdate: boolean
	setIsUpdate: Dispatch<SetStateAction<boolean>>
	refetch: () => void
	sendMailData: any
	quoteDetail: any
}

export const QuoteDetailButtons: React.FC<TProps> = ({ isUpdate, setIsUpdate, refetch, sendMailData, quoteDetail }) => {
	const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false })

	// EXTRACT PROPS
	const router = useRouter()

	const { id } = router.query

	const { handleSubmit, watch } = useFormContext()

	const { status } = watch()

	// METHODS
	const mutateCreate = useMutation((payload: TCreatePreQuote) => preQuote.create(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			router.push('/dashboard/quotation/quote-list')
		}
	})

	const handleCreate = useCallback(async (data: any) => {
		const { attachFile, products, isQuoteRequest, paymentType, paymentDocument, ...rest } = data || {}

		if (!data?.customerId) {
			toast.error('Chọn khách hàng trong hệ thống trước khi báo giá')

			return
		}

		if (products.length === 0) {
			toast.error('Phải chọn sản phẩm để báo giá')

			return
		}

		const productPayload = products.map((prod: any) => ({
			productId: prod?.productId,
			quantity: prod?.quantity,
			price: prod?.price,
			vat: prod?.vat,
			totalPrice: prod?.totalPrice,
			note: prod?.note
		}))

		const payload = {
			...rest,
			attachFile: attachFile.join(','),
			paymentType,
			paymentDocument: paymentDocument.join(','),
			preQuoteDetail: productPayload
		}

		await mutateCreate.mutateAsync(payload)
	}, [])

	const mutateUpdate = useMutation((payload: TUpdatePreQuote) => preQuote.update(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)

			setIsUpdate(false)

			refetch?.()

			setDialog({ open: false })
		}
	})

	const handleUpdate = useCallback(async (data: any) => {
		const { attachFile, products, isQuoteRequest, paymentType, paymentDocument, status, ...rest } = data || {}

		if (products.length === 0) {
			toast.error('Phải chọn sản phẩm để báo giá')

			return
		}

		const productPayload = products.map((prod: any) => ({
			id: prod?.id,
			productId: prod?.productId,
			quantity: prod?.quantity,
			price: prod?.price,
			vat: prod?.vat,
			note: prod?.note
		}))

		const payload = {
			...rest,
			attachFile: attachFile.join(','),
			paymentType,
			paymentDocument: paymentDocument.join(','),
			preQuoteDetailUpdate: productPayload
		}

		await mutateUpdate.mutateAsync(payload)
	}, [])

	const mutateSendMail = useMutation((payload: TSendMailProps) => preQuote.sendMail(payload), {
		onSuccess: (response: any) => {
			toast.success(response?.resultMessage)

			refetch?.()

			setDialog({ open: false })
		}
	})

	const handleSendMail = useCallback(
		async (data: any) => {
			const { cc, bcc, content, title } = data || {}

			const payload = {
				id: id as string,
				cc: _.compact(cc) as string[],
				bcc: _.compact(bcc) as string[],
				title: title as string,
				content
			}

			await mutateSendMail.mutateAsync(payload)
		},
		[id]
	)

	const printAreaRef = useRef<HTMLTableElement>(null)
	const handlePrint = useReactToPrint({
		content: () => printAreaRef.current,
		pageStyle: `
      @page {
        size: 210mm 297mm;
      }
    `
	})
	const onErrorForm = (err: any) => {
		toastFormError(err)
	}
	const renderButtons = useCallback(() => {
		switch (true) {
			case !id:
				return <AddButton onClick={handleSubmit(handleCreate, onErrorForm)}>Tạo báo giá</AddButton>
			case !!id && isUpdate:
				return (
					<>
						<BaseButton onClick={handleSubmit(handleUpdate, onErrorForm)}>Cập nhật</BaseButton>
						<BaseButton className="!bg-main-1 ml-3" onClick={() => setIsUpdate(false)}>
							Quay lại
						</BaseButton>
					</>
				)
			case !!id && !isUpdate:
				return (
					<Box className="flex items-center justify-end gap-3">
						{status <= 2 && (
							<>
								<EditButton tooltipText="Cập nhật" onClick={() => setIsUpdate(true)} />
								<SendButton onClick={() => setDialog({ open: true })}>Gửi khách hàng</SendButton>
							</>
						)}

						<PrintButton className="!bg-error" onClick={handlePrint}>
							In
						</PrintButton>
						<Box className="hidden">
							<PrintQuoteDetail printAreaRef={printAreaRef} defaultValue={quoteDetail} />
						</Box>
					</Box>
				)
		}
	}, [id, isUpdate, status])

	return (
		<Box className="flex justify-end mt-4">
			{renderButtons()}
			<SendMailDialog
				onClose={() => setDialog({ open: false })}
				open={dialog.open}
				sendMailHandler={handleSendMail}
				defaultValue={{ to: sendMailData?.to, cc: [...sendMailData?.cc] } as any}
			/>
		</Box>
	)
}
