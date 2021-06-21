import React, { useEffect } from 'react'
import { Box, useStdin } from 'ink'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import { Response } from 'node-fetch'
import {
  base_app_width,
  config_endpoint,
  error_tolarance,
  error_reconnect_delay_ms,
} from '../app-config.json'
import { useStore, AppStatus } from '../../store-provider'
import { doRequest, findMirror } from '../../search-api'
import Loader from './Loader'
import Header from './Header'
import Stage from './Stage'
import Downloader from './Downloader'
import BulkDownloader from './BulkDownloader'

const App = (): React.ReactElement => {
  const [cols] = useStdoutDimensions()

  const { setRawMode } = useStdin()

  const status: AppStatus = useStore((state) => state.globals.status)
  const initialStatus: AppStatus = useStore((state) => state.globals.initialStatus)
  const setConfig: (config: any) => void = useStore((state) => state.set.config)
  const setErrorCounter: (errorCounter: number) => void = useStore(
    (state) => state.set.errorCounter
  )
  const seetLastFailedAction: (lastFailedAction: () => void) => void = useStore(
    (state) => state.set.lastFailedAction
  )
  const setMirror: (mirror: string) => void = useStore((state) => state.set.mirror)
  const setStatus: (status: AppStatus) => void = useStore((state) => state.set.status)

  useEffect(() => {
    const setupTheApp = async () => {
      const onErr = (attempt: number, _: number) => {
        setErrorCounter(attempt)
      }

      // fetching latest configuration
      setStatus('fetchingConfig')
      const configResponse: Response | null = await doRequest(
        config_endpoint,
        onErr,
        error_tolarance,
        error_reconnect_delay_ms
      )

      if (configResponse == null) {
        // throw error here
        seetLastFailedAction(setupTheApp)
        setStatus('failed')
        return
      }

      const configJSON = await configResponse.json()
      setConfig(configJSON)

      // finding available mirror
      setStatus('findingMirror')

      const mirrorList: string[] = configJSON.mirrors || []
      const mirror: string | null = await findMirror(mirrorList)

      if (mirror == null) {
        // throw error here
        seetLastFailedAction(setupTheApp)
        setStatus('failed')
        return
      }

      setMirror(mirror)
      setStatus(initialStatus)
    }

    setupTheApp()

    setRawMode(true)
    ;() => setRawMode(false)
  }, [])

  return (
    <Box marginLeft={1} flexDirection="column">
      <Box width={cols - 5 > base_app_width ? base_app_width : '95%'} flexDirection="column">
        <Header width={cols - 5 > 40 ? 40 : '95%'} />
        <Loader />
        <Stage />
        <Downloader />
      </Box>
      {status == 'bulkDownloadingID' && <BulkDownloader mode="id" />}
      {status == 'bulkDownloadingMD5' && <BulkDownloader mode="md5" />}
    </Box>
  )
}

export default App
