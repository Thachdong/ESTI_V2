import { TextFieldProps, SelectProps, FormControlProps, InputLabelProps, AutocompleteProps, TextFieldProps } from '@mui/material'
import { QueryObserverOptions } from 'react-query'
import { ReactNode } from 'react'
import { TControllerProps } from '~types/react-hook-form'

type TAutocompleteProps = Partial<AutocompleteProps<any, boolean, boolean, boolean | undefined>> & {
	label: string
	options: any[]
	shrinkLabel?: boolean
	valueKey?: string
	labelKey?: string
	inputProps?: TextFieldProps
	getOptionLabel?: (option: any) => string
	onChange?: (val: any | any[]) => void
	callback?: (option: any) => void
}

type TAutocomplete = TAutocompleteProps & {
	controlProps: TControllerProps
}
type TAutocompleteAsync = Omit<TAutocompleteProps, 'options'> & {
	controlProps: TControllerProps
	fetcher: (params: any) => Promise<TBaseResponse<TPaginationResponse<any>>>
	fetcherParams?: object
	defaultOptions?: any[]
	enabled?: boolean
}
