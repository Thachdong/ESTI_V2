import { Box, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { Item, Menu } from 'react-contexify'
import { useQuery } from 'react-query'
import { mainOrder } from 'src/api'
import { customerType } from 'src/api/customer-type'
import {
	AddButton,
	ContextMenuWrapper,
	DataTable,
	DropdownButton,
	ExportButton,
	FilterButton,
	RefreshButton,
	StatisticButton,
	StatusChip,
	generatePaginationProps
} from '~modules-core/components'
import { defaultPagination, orderStatus } from '~modules-core/constance'
import { usePathBaseFilter } from '~modules-core/customHooks'
import { _format } from '~modules-core/utility/fomat'
import { BookingOrderNoteDialog, BookingOrderStatusDialog, ViewListProductDrawer } from '~modules-dashboard/components'
import { orderColumns } from '~modules-dashboard/pages/orders/booking-order/orderColumns'
import { TGridColDef } from '~types/data-grid'
import { TDefaultDialogState } from '~types/dialog'

type TProps = {
	onViewReport: () => void
	ViewReport: boolean
}

export const BookingOrderTable: React.FC<TProps> = ({ onViewReport, ViewReport }) => {
	const [defaultValue, setDefaultValue] = useState<any>()

	const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false })

	const [pagination, setPagination] = useState(defaultPagination)
	const [Open, setOpen] = useState<boolean>(false)
	const dataViewDetail = useRef<any>()
	const idEnterRow = useRef<any>()
	const router = useRouter()

	const { query } = router

	usePathBaseFilter(pagination)

	// DATA FETCHING
	const { data: customerTypes } = useQuery(['CustomerTypesList'], () =>
		customerType
			.getAll({
				pageSize: 999,
				pageIndex: 1
			})
			.then((res) => res.data?.map?.((d: any) => ({ label: d?.levelName, value: d?.id })))
	)

	const { data, isLoading, isFetching, refetch } = useQuery(
		[
			'mainOrders',
			'loading',
			{
				...pagination,
				...query
			}
		],
		() =>
			mainOrder
				.getList({
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					...query
				})
				.then((res) => res.data),
		{
			onSuccess: (data) => {
				setPagination({ ...pagination, total: data.totalItem })
			}
		}
	)

	// DATA TABLE
	const columns: TGridColDef[] = [
		...orderColumns,
		{
			field: 'levelName',
			headerName: 'Cấp độ NLH',
			flex: 1,
			minWidth: 125,
			type: 'select',
			options: customerTypes || [],
			filterKey: 'typeAccount',
			isSort: false
		},
		{
			field: 'totalPrice',
			headerName: 'TỔNG GT',
			minWidth: 150,
			renderCell: (params) => _format.getVND(params?.row?.totalPrice),
			sortAscValue: 15,
			sortDescValue: 4,
			filterKey: ''
		},
		{
			field: 'exportPrice',
			headerName: 'GT ĐÃ GIAO',
			minWidth: 150,
			renderCell: (params) => _format.getVND(params?.row?.exportPrice),
			sortAscValue: 16,
			sortDescValue: 5,
			filterKey: 'exportPrice'
		},
		{
			field: 'totalBillPrice',
			headerName: 'GT ĐÃ XUẤT HĐ',
			minWidth: 150,
			renderCell: (params) => _format.getVND(params?.row?.totalBillPrice),
			sortAscValue: 17,
			sortDescValue: 6,
			filterKey: 'totalBillPrice'
		},
		{
			field: 'billPaid',
			headerName: 'GT ĐÃ thanh toán',
			minWidth: 150,
			renderCell: ({ row }) => _format.getVND(row?.billPaid),
			isSort: false,
			filterKey: 'paid'
		},
		{
			field: 'branchCode',
			headerName: 'CHI NHÁNH',
			minWidth: 120,
			sortAscValue: 19,
			sortDescValue: 8,
			filterKey: 'branchCode'
		},
		{
			field: 'salesCode',
			headerName: 'SALES',
			minWidth: 120,
			sortAscValue: 20,
			sortDescValue: 9,
			filterKey: 'salesId'
		},
		{
			field: 'statusName',
			headerName: 'TRẠNG THÁI',
			minWidth: 120,
			sortAscValue: 21,
			sortDescValue: 10,
			filterKey: 'status',
			type: 'select',
			options: orderStatus,
			renderCell: ({ row }) => {
				const colors = ['default', 'info', 'success', 'error']
				return <StatusChip label={row?.statusName} status={row?.status} color={colors[row?.status - 1] as any} />
			}
		},
		{
			field: 'action',
			headerName: '',
			width: 50,
			renderCell: ({ row }) => (
				<DropdownButton
					id={row?.id as string}
					items={[
						{
							action: () =>
								router.push({
									pathname: '/dashboard/orders/order-detail/',
									query: { id: row?.id }
								}),
							label: 'Thông tin chi tiết'
						},
						{
							action: () => onOpen('UpdateStatus'),
							label: 'Trạng thái'
						},
						{
							action: () => onOpen('AddNote'),
							label: 'Ghi chú'
						},
						{
							action: () =>
								router.push({
									pathname: '/dashboard/warehouse/export-detail/',
									query: { fromOrderId: row?.id }
								}),
							label: 'Tạo phiếu xuất kho',
							disabled: row?.status !== 2
						},
						{
							action: () =>
								router.push({
									pathname: '/dashboard/orders/bill-detail/',
									query: { fromOrderId: row?.id }
								}),
							label: 'Tạo hóa đơn'
						}
					]}
				/>
			)
		}
	]

	const paginationProps = generatePaginationProps(pagination, setPagination)

	const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
		const id = e.currentTarget.dataset.id // STRING
		idEnterRow.current = id
	}
	const onSetRowDataToState = useCallback(
		(id: string) => {
			const currentRow = data?.items.find((item: any) => item.id == id)
			setDefaultValue(currentRow)
		},
		[data]
	)
	// METHODS
	const onClose = useCallback(() => {
		setDialog({ open: false })
	}, [])

	const onOpen = useCallback((type: string) => {
		setDialog({ open: true, type })
	}, [])

	const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
		const id: any = e.currentTarget.dataset.id
		const currentRow = await mainOrder.getMainOrderDetail(id).then((res) => {
			return res.data
		})

		dataViewDetail.current = { ...currentRow, id: id }
		setOpen(true)
	}

	return (
		<Paper className="bgContainer p-3 shadow">
			<Box className="flex gap-4 items-center mb-3 justify-between">
				<Box>
					<AddButton variant="contained" onClick={() => router.push('/dashboard/orders/order-detail')}>
						TẠO MỚI ĐƠN ĐẶT HÀNG
					</AddButton>
				</Box>
				<Box className="flex gap-2">
					<StatisticButton onClick={onViewReport} View={ViewReport} />
					<FilterButton listFilterKey={[]} />
					<RefreshButton onClick={() => refetch()} />
					<ExportButton api={mainOrder.export} filterParams={{ ...query, pageSize: 99999 }} />
				</Box>
			</Box>
			<ContextMenuWrapper
				menuId="order_request_table_menu"
				onRightClick={() => onSetRowDataToState(idEnterRow.current)}
				menuComponent={
					<Menu className="p-0" id="order_request_table_menu">
						<Item
							id="view-order"
							onClick={() =>
								router.push({
									pathname: '/dashboard/orders/order-detail/',
									query: { id: defaultValue?.id }
								})
							}
						>
							Xem chi tiết
						</Item>

						<Item id="update-status" onClick={() => onOpen('UpdateStatus')}>
							Trạng thái
						</Item>

						<Item id="order-note" onClick={() => onOpen('AddNote')}>
							Ghi chú
						</Item>

						<Item
							id="warehouse-export"
							onClick={() =>
								router.push({
									pathname: '/dashboard/warehouse/export-detail/',
									query: { fromOrderId: defaultValue?.id }
								})
							}
							disabled={defaultValue?.status !== 2}
						>
							Tạo phiếu xuất kho
						</Item>

						<Item
							id="delete-order"
							onClick={() =>
								router.push({
									pathname: '/dashboard/orders/bill-detail/',
									query: { fromOrderId: defaultValue?.id }
								})
							}
						>
							Tạo hóa đơn
						</Item>
					</Menu>
				}
			>
				<DataTable
					rows={data?.items as []}
					columns={columns}
					gridProps={{
						loading: isLoading || isFetching,
						...paginationProps
					}}
					componentsProps={{
						row: {
							onMouseEnter: onMouseEnterRow,
							onDoubleClick: handleViewProduct
						}
					}}
					getRowClassName={({ id }) => (dataViewDetail?.current?.id == id && Open ? '!bg-[#fde9e9]' : '')}
				/>
			</ContextMenuWrapper>

			<BookingOrderStatusDialog
				onClose={onClose}
				open={Boolean(dialog.open && dialog.type === 'UpdateStatus')}
				type={dialog.type}
				defaultValue={defaultValue}
				refetch={refetch}
			/>

			<BookingOrderNoteDialog
				onClose={onClose}
				open={Boolean(dialog.open && dialog.type === 'AddNote')}
				type={dialog.type}
				defaultValue={defaultValue}
			/>
			<ViewListProductDrawer Open={Open} onClose={() => setOpen(false)} data={dataViewDetail?.current?.mainOrderDetail} />
		</Paper>
	)
}
