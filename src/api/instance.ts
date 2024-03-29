import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
const TIMEOUT_IN_MILISECOND = 25000

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL + 'api/',
	timeout: TIMEOUT_IN_MILISECOND
})

export const setBearerToken = () => {
	const accessToken = localStorage.getItem('accessToken')

	if (!!accessToken) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
	}
}

const getUrlFromConfig = (config: AxiosRequestConfig) => {
	const { baseURL, url } = config

	return baseURL ? url?.replace(baseURL, '') : url
}

const useRequestCongif = async (config: AxiosRequestConfig) => {
	const { method, params, data, headers } = config || {}

	const url = getUrlFromConfig(config)

	const bearerToken = headers?.['Authorization']

	// TRY TO GET TOKEN WHEN IT ABSENT FROM HEADER
	if (!bearerToken) {
		const accessToken = await localStorage.getItem('accessToken')

		if (!!accessToken) {
			config.headers = {
				...headers,
				Authorization: `Bearer ${accessToken}`
			}
		}
	}

	console.log(`%c ${method?.toUpperCase()} - ${url}:`, 'color: #0086b3; font-weight: bold', { params, data })

	return config
}

const useRequestConfigError = (error: AxiosError) => Promise.reject(error)

instance.interceptors.request.use(useRequestCongif, useRequestConfigError)

const useResponseSuccess = (response: AxiosResponse) => {
	const { data, status, config } = response || {}

	// console.log(` %c ${response.status} - ${getUrlFromConfig(response.config)}:`, 'color: #008000; font-weight: bold', response)

	return response
}

const useResponseError = (error: AxiosError) => {
	const { isAxiosError } = error || {}

	const response: any = error?.response

	if (isAxiosError && response) {
		const { config, status, data } = response || {}

		const url = getUrlFromConfig(config)

		const errorMessage = response?.data?.resultMessage

		console.log(` %c ${response.status} - ${getUrlFromConfig(response.config)}:`, 'color: #008000; font-weight: bold', response)

		// ABORT ALL REQUEST IF 401 | 408 | 403 MEET TWICE
		if (isAbort) {
			throw new axios.Cancel('401 trigger more than twice!')
		}

		if (window === undefined) {
			return Promise.reject(error)
		}

		switch (status) {
			case 401:
			case 408: {
				// IGNORE WITH SOME ROUTES
				if (url?.includes('Authenticate/login')) {
					break
				}

				const { pathname } = window.location

				// TURN ON ABORT FLAG
				isAbort = true

				// ALERT SOME INFO TO USER
				window?.alert?.(errorMessage || 'Phiên đăng nhập hết hạn!')

				// LOGOUT
				localStorage.clear()

				window.location.replace(`/auth/login?callbackUrl=${pathname}`)

				break
			}
			default:
				break
		}
	} else {
		console.log('Lỗi không xác định!')
	}

	return Promise.reject(error)
}

// THIS FLAG WILL TRIGGER ABORT ALL REQUEST IF 401 | 408 | 403 MEET TWICE
let isAbort = false

instance.interceptors.response.use(useResponseSuccess, useResponseError)
