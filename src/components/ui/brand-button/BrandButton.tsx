
import styles from './button.module.css';

interface Props {
    text: string
    color?: string
    customClass?: string
    disabled?: boolean
  }

export const BrandButton = ({ text, color, customClass, disabled = false }: Props) => {
    return (
        <button className={`${styles.btn} ${styles['btn--huge']} ${customClass}`} disabled={disabled}
        >{ text }</button>
    );
}
