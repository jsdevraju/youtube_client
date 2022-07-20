import React from 'react'
import Meta from '../app/components/Meta/Meta'
import styles from '../styles/404.module.css'

const NotFound = () => {
  return (
    <>
    <Meta title="Not Found - Youtube" />
    <div className={styles.error}>
        <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="" />
        <p>This page isn't available. Sorry about that.</p>
       <p> Try searching for something else.</p>
    </div>
    </>
  )
}

export default NotFound