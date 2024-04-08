import React, { useState } from 'react'
import RouterLinks from '../RouterLinks'
import styles from './HeaderLinks.module.scss'
export default function HeaderLinks() {
    const [lineLeft, setLineLeft] = useState('0')
    const [lineWidth, setLineWidth] = useState('0')
    const [reRender, setReRender] = useState(false)
    React.useEffect(() => {
        lineActive()
        if (reRender) {
            setReRender(false)
        }
    }, [reRender])
    const lineActive = () => {
        const headerLinks = document.querySelector(`.${styles.header_links}`)
        if (headerLinks) {
            const children = headerLinks.children
            for (const child of children) {
                child.addEventListener('click', () => {
                    setLineLeft(child.offsetLeft + 'px')
                    setLineWidth(child.offsetWidth + 'px')
                    setReRender(true)
                })
            }
        }
        const logoActive = document.querySelector('#logo')
        if (logoActive) {
            logoActive.addEventListener('click', () => {
                if (logoActive.className === 'active') {
                    setLineLeft(0)
                    setReRender(true)
                }
            })
        }
        const line = document.querySelector(`.${styles.header_links_line}`)
        if (line) {
            line.style.width = lineWidth
            line.style.left = lineLeft
        }
    }
  return (
    <div className={styles.header_links}>
        <RouterLinks to='/'>Home</RouterLinks>
        <RouterLinks to='/about'>About</RouterLinks>
        <RouterLinks to='/blog'>Blog</RouterLinks>
        <RouterLinks to='/pages'>Pages</RouterLinks>
        <RouterLinks to='/contact'>Contact</RouterLinks>
        <div className={styles.header_links_line}></div>
        {lineActive()}
    </div>
    
  )
}
