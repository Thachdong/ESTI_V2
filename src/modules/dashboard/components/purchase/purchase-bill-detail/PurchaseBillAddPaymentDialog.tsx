import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { TBillAddbill, productOrderPaymentApi } from 'src/api'
import { BaseButton, Dialog, FormDatepicker, FormInputNumber } from '~modules-core/components'
import { toast } from '~modules-core/toast'
import { toastApiErr, toastFormError } from '~modules-core/toast/toastFormError'
import { _format } from '~modules-core/utility/fomat'
import { TDialog } from '~types/dialog'

import { IPostProductOrderPayment } from '~types/productOrderPayment'

type FCProps = {
	onClose: () => void
	isOpen: boolean
	productOrderBillId?: string
}
export const PurchaseBillAddPaymentDialog: React.FC<FCProps> = ({ onClose, isOpen, productOrderBillId }) => {
	const queryClient = useQueryClient()
	const { control, handleSubmit, reset } = useForm<any>({
		defaultValues: {
			paymentDate: moment().valueOf()
		}
	})

	// METHODS
	const mutationCreate = useMutation((payload: IPostProductOrderPayment) => productOrderPaymentApi.create(payload), {
		onSuccess: (data) => {
			toast.success(data.resultMessage)
			queryClient.invalidateQueries(['PurchaseOrderBillDetail', productOrderBillId])
			onClose()
			reset()
		},
		onError: (err) => {
			// console.log(err)
			toastApiErr(err)
		}
	})
	const onSubmit = (data: any) => {
		if (productOrderBillId) {
			const fmData = {
				...data,
				productOrderBillId
			}
			mutationCreate.mutateAsync(fmData)
		}
	}
	const onFormError = (err: any) => {
		toastFormError(err)
	}

	return (
		<Dialog
			onClose={() => {
				onClose()
				reset()
			}}
			open={isOpen}
			maxWidth="sm"
			title={'Thêm mới phiếu thanh toán'}
		>
			<form onSubmit={handleSubmit(onSubmit, onFormError)}>
				<Box className="grid gap-4">
					<FormDatepicker
						controlProps={{
							control,
							name: 'paymentDate',
							rules: { required: 'Phải chọn ngày thanh toán' }
						}}
						label="Ngày thanh toán"
					/>

					<FormDatepicker
						controlProps={{
							control,
							name: 'nextPaymentDate'
						}}
						label="Ngày thanh toán tiếp theo"
					/>

					<FormInputNumber
						controlProps={{
							control,
							name: 'paid',
							rules: { required: 'Phải nhập số tiền thanh toán' }
						}}
						label="Số tiền thanh toán"
						shrinkLabel
					/>
				</Box>

				<Box className="flex justify-center items-center mt-4">
					<LoadingButton className="px-8" variant="contained" loading={mutationCreate.isLoading} type="submit">
						Thêm
					</LoadingButton>
					<BaseButton
						type="button"
						className="!bg-main-1 ml-4 px-8"
						onClick={() => {
							onClose()
							reset()
						}}
					>
						Hủy
					</BaseButton>
				</Box>
			</form>
		</Dialog>
	)
}
