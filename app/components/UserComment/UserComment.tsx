import React from 'react'
import styles from './style.module.css';


const UserComment = () => {
  return (
    <div className={styles.container}>
        <img src="https://randomuser.me/api/portraits/men/30.jpg" className={styles.avatar} alt="Razu Islam" />
        <div className={styles.details}>
            <span className={styles.name}>John Doe <span className={styles.date}>2 days ago</span></span>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi rem fugit iure, ex placeat ullam, praesentium quae mollitia id blanditiis molestiae pariatur minima quidem aperiam?
            </p>
        </div>
    </div>
  )
}

export default UserComment