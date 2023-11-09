import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import 'react-contexify/ReactContexify.css'
import 'rc-tree-select/assets/index.css'
import '~styles/globals.css'
import '../fonts/stylesheet.css'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'

import { IMyAppProps } from 'src/types/_app'
import { createEmotionCache } from '~modules-core/providers/mui-provider/theme/utility'
import { MuiProvider, ReactQueryProvider } from '~modules-core/providers'
import { toastOptions } from '~modules-core/toast'
import { useNprogress } from '~modules-core/customHooks/useNprogress'
import { useStartUp } from '~modules-core/customHooks'
import { CoreLayout } from '~modules-core/components/CoreLayout'

const clientEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCache = clientEmotionCache }: IMyAppProps) {
	const [loading, setLoading] = useState(false)

	useNprogress(setLoading)

	useStartUp()

	const displayName = Component.displayName

	return (
		<ReactQueryProvider>
			<MuiProvider emotionCache={emotionCache}>
				<Head>
					<link rel="icon" type="image/png" href="/logo-small.png" />
					<title>{loading ? 'Đang chuyển hướng add some change here...' : displayName}</title>
				</Head>

				<ToastContainer {...toastOptions} />

				<CoreLayout Page={Component} />
			</MuiProvider>
		</ReactQueryProvider>
	)
}

export default MyApp
