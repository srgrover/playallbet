
import styles from './button.module.css';

interface Props {
    text: string
    color?: 'primary' | 'submit'
    customClass?: string
    disabled?: boolean
  }

export const BrandButton = ({ text, color = 'primary', customClass, disabled = false }: Props) => {
    return (
        <button className={`${styles.btn} ${styles[`btn--${color || 'primary'}`]} ${ customClass }`} disabled={ disabled }>{ text }</button>
    );
}
