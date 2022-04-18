import styles from "../styles/User.module.css"

export default function UserData({name, value}){
    return <div>
        <h3 className={styles.subtitle}>{name}</h3>
        <p className={styles.description}>{value}</p>
    </div>
}