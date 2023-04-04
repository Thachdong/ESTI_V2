import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { useCallback, useState } from 'react'
import { AddButton, DataTable } from '~modules-core/components'
import { useDisclosure } from '~modules-core/utility'
import { BillListBillDialog } from '~modules-dashboard/components'
import { paymentHistoryColumns } from '~modules-dashboard/pages/orders/bill-detail/data'
import { TDefaultDialogState } from '~types/dialog'
import { PurchaseBillAddPaymentDialog } from './PurchaseBillAddPaymentDialog'

type TProps = {
	dataPayment: any[]

	paidData?: any
	refetch?: () => void
	productOrderBillId?: string
}

export const PurchaseBillDetailPaymentHistory: React.FC<TProps> = ({ productOrderBillId, dataPayment, refetch, paidData }) => {
	// METHODS
	const addController = useDisclosure()

	// const historyLength = data.length

	// const { nextPaymentDate } = data?.[historyLength - 1] || {}

	return (
		<Box>
			<Box className="flex justify-between items-center mb-[10px]">
				<Typography className="font-bold uppercase text-sm">THÔNG TIN THANH TOÁN</Typography>
				<Box className="flex justify-end">
					<AddButton onClick={addController.onOpen} className="max-w-[250px] !ml-auto">
						Thêm phiếu thanh toán
					</AddButton>
				</Box>
			</Box>

			<Box className="bg-white rounded pb-3">
				<DataTable
					rows={dataPayment?.map((item: any, index: number) => ({
						...item,
						no: index + 1
					}))}
					columns={paymentHistoryColumns}
					hideFooter
					hideSearchbar
					autoHeight
				/>
			</Box>
			<PurchaseBillAddPaymentDialog
				productOrderBillId={productOrderBillId}
				onClose={addController.onClose}
				isOpen={addController.isOpen}
			/>
			{/* {paidData?.unPaid > 0 && ( // api yêu cầu luôn mở nút thêm phiếu thanh toán
        <Box className="flex justify-end">
          <AddButton onClick={onOpen} className="max-w-[250px] !ml-auto my-3">
            Thêm phiếu thanh toán
          </AddButton>
        </Box>
      )} */}
		</Box>
	)
}
