import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useReactToPrint } from 'react-to-print'
import { purchaseOrderBill, TCreatePurchaseOrderBill } from 'src/api/purchase-order-bill'
import { AddButton, PrintButton } from '~modules-core/components'
import { toast } from '~modules-core/toast'
import { toastFormError } from '~modules-core/toast/toastFormError'
import { PrintPurchaseBillDetail } from '~modules-dashboard/components'

type TProps = {
	refetch?: () => void
	sendMailData: {
		to: string
		status: number
		cc: string[]
	}
}

export const PurchaseBillDetailButtons: React.FC<TProps> = ({ refetch, sendMailData }) => {
	// EXTRACT PROPS
	const router = useRouter()

	const { id } = router.query

	const { handleSubmit, formState } = useFormContext()

	// METHODS
	const mutateCreate = useMutation((payload: TCreatePurchaseOrderBill) => purchaseOrderBill.create(payload), {
		onSuccess: (data: any) => {
			toast.success(data?.resultMessage)
			router.push('/dashboard/purchase/purchase-bill')
		}
	})

	const handleCreate = useCallback(async (data: any) => {
		const { products, attachFile, ...rest } = data

		const productPayload = products.map((prod: any) => ({
			productId: prod?.productId,
			quantity: prod?.quantity,
			price: prod?.price,
			vat: prod?.vat,
			totalPrice: prod?.totalPrice
		}))

		const payload = {
			...rest,
			attachFile: attachFile?.join(','),
			billDetailCreate: productPayload
		}

		await mutateCreate.mutateAsync(payload)
	}, [])

	const onErrorForm = (err: any) => {
		toastFormError(err)
		console.log(formState.errors)
	}

	const printAreaRef = useRef<HTMLTableElement>(null)
	const handlePrint = useReactToPrint({
		content: () => printAreaRef.current,
		pageStyle: `
      @page {
        size: 210mm 297mm;
      }
    `
	})

	return (
		<Box className="flex justify-end">
			{!id ? (
				<AddButton onClick={handleSubmit(handleCreate, onErrorForm)}>Tạo hóa đơn</AddButton>
			) : (
				<PrintButton onClick={handlePrint} className="bg-error ">
					In
				</PrintButton>
			)}
			{!!id ? (
				<Box className="hidden">
					<PrintPurchaseBillDetail printAreaRef={printAreaRef} defaultValue={[]} />
				</Box>
			) : null}
		</Box>
	)
}
