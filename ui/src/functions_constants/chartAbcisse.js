export default function getMonthlyDates(start, end, day) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const result = [];

    if (startDate.getDate() > day) {
        startDate.setMonth(startDate.getMonth() + 1);
    }
    while (startDate <= endDate) {
        startDate.setDate(day);
        result.push(startDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }));
        startDate.setMonth(startDate.getMonth() + 1);
    }

    return result;
}

