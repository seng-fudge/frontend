import styles from "../styles/User.module.css"

export default function FormInput({ type, id, name }) {
    return <div>
        <label className={styles.label}>
            {name}
        </label>
        <input type={type} className={styles.input} id={id} name={id} placeholder={name} required/>
    </div>;
}
