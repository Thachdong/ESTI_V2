import React from 'react'
import { Box, styled, Table, TableBody, TableCell, tableCellClasses, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import style from './index.module.scss'
import { _format } from '~modules-core/utility/fomat'

export const PrintPurchaseBillDetail: React.FC<{
	printAreaRef: any
	defaultValue: any
}> = ({ defaultValue, printAreaRef }) => {
	const rows: any = [{ send: 'Phuc', recive: 'Phuc' }]
	const rowsOrder: any = [
		{
			stt: '1',
			code: 'B108735-25G',
			info: 'B108735-25G Hóa chất Pararosaniline hydrochloride',
			specifications: '25 G',
			unit: ' Chai',
			quantity: '1',
			price: 111111,
			intomoney: 111111,
			note: '',
			producer: 'Aladdin',
			origin: 'Trung Quốc'
		},
		{
			stt: '1',
			code: 'B108735-25G',
			info: 'B108735-25G Hóa chất Pararosaniline hydrochloride',
			specifications: '25 G',
			unit: ' Chai',
			quantity: '1',
			price: 111111,
			intomoney: 111111,
			note: '',
			producer: 'Aladdin',
			origin: 'Trung Quốc'
		}
	]

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: '#051e34',
			color: theme.palette.common.white,
			paddingLeft: 4,
			paddingRight: 4,
			paddingTop: 0,
			paddingBottom: 0,
			border: 0.5,
			borderStyle: 'solid',
			borderColor: '#000',
			fontSize: '10pt',
			fontWeight: 600,
			whiteSpace: 'nowrap'
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 12,
			padding: 8,
			border: 0.5,
			borderStyle: 'solid',
			borderColor: '#000'
		}
	}))

	return (
		<Table style={{ fontSize: '10pt' }} ref={printAreaRef} className={style.PrintContainer}>
			{/* HEADER */}
			<TableHead>
				<TableRow className={style.Header}>
					<Box className={style.logoHeader}>
						<img src="/logo-full.png" alt="logo-navis" width={180} height={80} />
					</Box>
					<Box className={style.contentHeader}>
						<p className={style.contentTitleHeader}>BIÊN BẢN NHẬN HÀNG</p>
						<p>Ngày nhận: 23/02/2023</p>
						<p>Mã nhà cung cấp: KH-346</p>
						<p>Mã biên bản nhận hàng: ĐH23-03856</p>
					</Box>
				</TableRow>
			</TableHead>

			<TableBody>
				<TableRow>
					<Box sx={{ marginBottom: 2 }}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Thông tin bên bán</StyledTableCell>
									<StyledTableCell align="left">Thông tin bên mua</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody className={style.tableBody}>
								{rows.map((row: any, index: number) => (
									<TableRow key={`Thông tin bên mua-${row.name}-${index}`}>
										<StyledTableCell component="th" scope="row">
											<Typography sx={{ fontWeight: 600, fontSize: '10pt' }}>CÔNG TY TNHH NAVIS VIỆT NAM </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Mã số thuế: 0312481940 </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>
												Ðịa chỉ: L3 Tòa Nhà Vạn Ðạt Lô II-1, Ðường Số 8 (CN8), KCN Tân Bình
											</Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Người liên hệ: Lê Thị Hồng Cẩm </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Email: mn.cam-lethihong@esti.vn </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Ðiện thoại: 0896009939 </Typography>
										</StyledTableCell>
										<StyledTableCell align="left">
											<Typography sx={{ fontWeight: 600, fontSize: '10pt' }}>CÔNG TY TNHH NAVIS VIỆT NAM </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Mã số thuế: 0312481940 </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>
												Ðịa chỉ: L3 Tòa Nhà Vạn Ðạt Lô II-1, Ðường Số 8 (CN8), KCN Tân Bình
											</Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Người đại diện: Lê Thị Hồng Cẩm </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Email: mn.cam-lethihong@esti.vn </Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Ðiện thoại: 0896009939 </Typography>
										</StyledTableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>

					<Box className={style.InforOrder}>
						<Table sx={{ minWidth: 700 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>STT</StyledTableCell>
									<StyledTableCell align="left">Mã SP</StyledTableCell>
									<StyledTableCell align="left">Thông tin SP</StyledTableCell>
									<StyledTableCell align="left">Quy cách</StyledTableCell>
									<StyledTableCell align="left">Đơn vị</StyledTableCell>
									<StyledTableCell align="left">SL</StyledTableCell>
									<StyledTableCell align="left">Đơn giá</StyledTableCell>
									<StyledTableCell align="left">Thành tiền</StyledTableCell>
									<StyledTableCell align="left">Ghi chú</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody className={style.tableBody}>
								{rowsOrder.map((row: any, idx: number) => (
									<TableRow key={`producs-${row.name}-${idx}`}>
										<StyledTableCell component="th" scope="row">
											{row?.stt}
										</StyledTableCell>
										<StyledTableCell align="left"> {row?.code}</StyledTableCell>
										<StyledTableCell component="th" scope="row">
											{' '}
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>{row?.info}</Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Nhà sản xuất: {row?.producer}</Typography>
											<Typography sx={{ margin: 0, fontSize: '10pt' }}>Xuất sứ: {row?.origin}</Typography>
										</StyledTableCell>
										<StyledTableCell align="left"> {row?.specifications}</StyledTableCell>
										<StyledTableCell component="th" scope="row">
											{' '}
											{row?.unit}
										</StyledTableCell>
										<StyledTableCell align="left"> {row?.quantity}</StyledTableCell>
										<StyledTableCell component="th" scope="row">
											{' '}
											{_format.getVND(row?.price)}
										</StyledTableCell>
										<StyledTableCell align="left"> {_format.getVND(row?.intomoney)}</StyledTableCell>
										<StyledTableCell component="th" scope="row">
											{' '}
											{row?.note}
										</StyledTableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<Box className={style.paymentOrder}>
							<Box className={style.paymentItemOrder}>
								<span className={style.title}>Thành tiền chưa có thuế(VNÐ):</span> <span>111,111</span>
							</Box>
							<Box className={style.paymentItemOrder}>
								<span className={style.title}>Thuế GTGT:</span> <span>111,111</span>
							</Box>
							<Box className={style.paymentItemOrder}>
								<span className={style.title}>Tổng cộng tiền thanh toán(VNÐ):</span> <span>111,111</span>
							</Box>
						</Box>
					</Box>
				</TableRow>
			</TableBody>

			<TableFooter>
				<Box>
					<Typography sx={{ fontSize: '10pt' }}>Phiếu nhận hàng được lập thành 02 bản, mỗi bên giữ 01 bản.</Typography>
					<Typography sx={{ fontWeight: 600, fontSize: '10pt' }}>THANK YOU FOR YOUR KIND COOPERATION</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '70%',
						margin: 'auto'
					}}
				>
					<Box>
						<Typography
							sx={{
								textAlign: 'center',
								marginTop: 2
							}}
						>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: '10pt'
								}}
							>
								ĐẠI DIỆN BÊN GIAO
							</Typography>
							<Typography
								sx={{
									fontSize: '10pt',
									fontStyle: 'italic'
								}}
							>
								{'(Ký và ghi rõ họ tên)'}
							</Typography>
						</Typography>
					</Box>
					<Box>
						<Typography
							sx={{
								textAlign: 'center',
								marginTop: 2
							}}
						>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: '10pt'
								}}
							>
								ĐẠI DIỆN BÊN NHẬN
							</Typography>
							<Typography
								sx={{
									fontSize: '10pt',
									fontStyle: 'italic'
								}}
							>
								{'(Ký và ghi rõ họ tên)'}
							</Typography>
						</Typography>
					</Box>
				</Box>
			</TableFooter>
		</Table>
	)
}
