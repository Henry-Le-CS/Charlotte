import { useRouterLinks } from '$/hooks/use-router-links'
import { Link } from 'react-router-dom'
import styles from './RouterLinks.module.scss'

export default function RouterLinks ({ children, to, ...props}) {
    // not yet to used
    let match = useRouterLinks(to)

    return (
        <>
        <Link to={to} className={styles.link} {...props}>
            {children}
        </Link>
        </>
    )
}