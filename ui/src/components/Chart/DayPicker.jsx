import { useState } from 'react';

function DayPicker({setDate}) {
    const [selectedDay, setSelectedDay] = useState(3);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setDate(day);
    };

    return (
        <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
            {days.map((day) => (
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDayClick(day)}
                    style={{
                        display: 'inline-block',
                        padding: '10px',
                        margin: '5px',
                        backgroundColor: selectedDay === day ? '#007bff' : '#f8f9fa',
                        color: selectedDay === day ? '#fff' : '#000',
                        border: '1px solid #007bff',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}

export default DayPicker;
