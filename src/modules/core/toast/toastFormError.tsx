import { checkIsArray } from '~modules-core/utility'
import { toast } from '.'
export const toastFormError = (err: any) => {
	const error: any = Object.values(err)[0]

	try {
		if (checkIsArray(error)) {
			console.log(error)
			for (let i = 0; i < error.length; i++) {
				if (!!error[i]) {
					const arrError: any = Object.values(error[i])[0]
					toast.error(arrError?.message)
					break
				}
			}

			return
		} else {
			toast.error(error?.message)
		}
	} catch (error) {
		toast.error('Lỗi không nhận định')
	}
}

export const toastApiErr = (err: any) => {
	return toast.error(err.resultMessage)
}
