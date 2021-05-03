import { useLocation } from 'react-router-dom'

export const useQueryURLParams = () => {
    return new URLSearchParams(useLocation().search)
}
