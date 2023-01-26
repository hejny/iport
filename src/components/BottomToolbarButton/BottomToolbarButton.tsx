import Image from 'next/image';
import arrowUpClosed from '../../../public/icons/arrow-up-closed.png';
import arrowUp from '../../../public/icons/arrow-up.png';
import { classNames } from '../../utils/classNames';
import styles from './BottomToolbarButton.module.css';

interface BottomToolbarButtonProps {
    direction: 'RIGHT' | 'LEFT' | 'DOWN';
    isClosed?: boolean;
    onClick(): void;
}

export function BottomToolbarButton(props: BottomToolbarButtonProps) {
    const { direction, isClosed, onClick } = props;
    return (
        <div
            className={classNames(styles.BottomToolbarButton, styles[direction.toLowerCase()])}
            onClick={() => {
                onClick();
            }}
        >
            <Image alt="arrow" src={!isClosed ? arrowUp : arrowUpClosed} />
        </div>
    );
}
