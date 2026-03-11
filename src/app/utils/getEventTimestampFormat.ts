export const getEventTimestampFormat = (timestamp: number) => {
    const eventDate = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const eventTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    if (eventDate.toDateString() === today.toDateString()) {
        return `Hoy a las ${eventTime}`;
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
        return `Mañana a las ${eventTime}`;
    } else {
        const eventDay = eventDate.toLocaleDateString([], { day: 'numeric', month: 'long' });
        return `El ${eventDay} a las ${eventTime}`;
    }
};
