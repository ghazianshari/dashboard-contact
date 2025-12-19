export const formatDateTime = (iso: string) => {
    const d = new Date(iso);

    const date = d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
    });

    const time = d.toLocaleTimeString('id-ID', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta',
        timeZoneName: 'short',
    });

    return `${date}, ${time}`;
};
