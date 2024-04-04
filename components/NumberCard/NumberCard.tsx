"use client"

import styles from "./NumberCard.module.scss";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function NumberCard({ icon, number, text }: { icon: any, number: string, text: string }) {

    return (
        <div className={styles.container}>
            {icon}
            <h3>{number}</h3>
            <div className={styles.yearWrapper}>
                <CalendarTodayIcon sx={{ fontSize: 12 }} />
                2023
            </div>
            <p>{text}</p>
        </div>
    );
}