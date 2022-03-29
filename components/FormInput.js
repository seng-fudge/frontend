import styles from "../styles/User.module.css"

export default function({number, id, name}){
    return (number ? FormInputNumber(id, name) : FormInputText(id, name));
}

function FormInputText(id, name){
    return <div>
            <label className = {styles.label}>
                {name}
            </label>
            <input type="text" className={styles.input} id = {id} name = {id} placeholder={name}/>
        </div>;
}

function FormInputNumber(id, name){
    return <div>
            <label className = {styles.label}>
                {name}
            </label>
            <input type="number" className={styles.input} id = {id} name = {id} placeholder={name}/>
        </div>;
}