import {useMemo} from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryURLParams = () => {
    const URL_Param = useLocation().search
    return useMemo(() => new URLSearchParams(URL_Param), [URL_Param])
}
