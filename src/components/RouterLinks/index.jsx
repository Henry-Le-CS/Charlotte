import { useRouterLinks } from '$/hooks/use-router-links'
import { Link } from 'react-router-dom'

export default function RouterLinks ({ children, to, ...props}) {
    const match = useRouterLinks(to)
    const isActive = Boolean(match)
    const className = isActive ? 'active' : ''
    return (
        <>
        <Link 
        to={to}
        className={className} 
        {...props}>
            {children}
        </Link>
        </>
    )
}