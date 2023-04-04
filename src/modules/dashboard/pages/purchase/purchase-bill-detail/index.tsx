//LOGIC BẢNG SẢN PHẨM:
// 1. SP đc lấy từ đơn mua hàng
// 2. Chỉ hiển thị sp có billQuantity > 0

import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { purchaseOrder } from 'src/api'
import { purchaseOrderBill } from 'src/api/purchase-order-bill'
import { _format } from '~modules-core/utility/fomat'
import {
	PurchaseBillDetailAttach,
	PurchaseBillDetailButtons,
	PurchaseBillDetailGeneral,
	PurchaseBillDetailPaymentHistory,
	PurchaseBillDetailProducts,
	PurchaseBillDetailSupplier
} from '~modules-dashboard/components'

export const PurchaseBillDetailPage: React.FC = () => {
	const { id, fromPurchaseOrderId } = useRouter().query

	const method = useForm<any>({
		mode: 'onBlur',
		defaultValues: {
			products: []
		}
	})

	const { productOrderId } = method.watch()

	// DATA FETCHING
	const { data: purchaseDetail } = useQuery(
		['PurchaseDetail', productOrderId],
		() => purchaseOrder.getById(productOrderId).then((res) => res.data),
		{
			enabled: !!productOrderId
		}
	)

	const purchaseData = purchaseDetail?.productOrder?.productOrder || {}

	const { data: billDetail, refetch } = useQuery(
		['PurchaseOrderBillDetail', id],
		() => purchaseOrderBill.getById(id as string).then((res) => res.data),
		{
			enabled: !!id,
			onSuccess: (res) => console.log('res', res)
		}
	)

	// SIDE EFFECTS
	useEffect(() => {
		const supplierId = purchaseData?.supplierId

		method.setValue('supplierId', supplierId)

		const products = purchaseDetail?.productOrderDetail?.filter?.((prod: any) => prod?.billQuantity !== 0) || []

		method.setValue('products', products)
	}, [purchaseDetail])

	useEffect(() => {
		const { productOrderId, billNumber, supplierId, attachFile } = billDetail?.productOrderBillById || {}
		const files = !attachFile ? [] : attachFile.split?.(',')
		const products = billDetail?.productOrderBillDetailList || []
		method.reset({
			productOrderId,
			billNumber,
			supplierId,
			attachFile: files,
			products
		})
	}, [billDetail])

	useEffect(() => {
		!!fromPurchaseOrderId && method.setValue('productOrderId', fromPurchaseOrderId)
	}, [fromPurchaseOrderId])

	return (
		<FormProvider {...method}>
			<Box className="container-center grid grid-cols-2 gap-8">
				<Box className="col-span-2">
					<PurchaseBillDetailGeneral purchaseData={purchaseData} />
				</Box>

				<Box className="col-span-2">
					<PurchaseBillDetailSupplier />
				</Box>

				<Box className="col-span-2 lg:col-span-1">
					<PurchaseBillDetailAttach />
				</Box>
				{!!id && (
					<Box className="col-span-2">
						<PurchaseBillDetailPaymentHistory
							dataPayment={billDetail?.productOrderPayment || []}
							productOrderBillId={id as string | undefined}
						/>
					</Box>
				)}
				<Box className="col-span-2">
					<PurchaseBillDetailProducts productList={purchaseDetail?.productOrderDetail || []} />
				</Box>
				<Box className="col-span-2">
					<PurchaseBillDetailButtons
						refetch={refetch}
						sendMailData={{
							to: billDetail?.productOrderBillById?.curatorEmail,
							status: billDetail?.productOrderBillById?.status,
							cc: [billDetail?.productOrderBillById?.salesAdminEmail]
						}}
					/>
				</Box>
			</Box>
		</FormProvider>
	)
}
