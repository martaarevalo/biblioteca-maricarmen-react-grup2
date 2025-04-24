import { useState, useEffect } from 'react';
import { getUserHistory } from '../services/api';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchHistory = async () => {
        const data = await getUserHistory();
        setHistory(data);
        setLoading(false);
        };
    
        fetchHistory();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        <h1>Historial de llibres</h1>
        {history.length === 0 ? (
            <p>No hi ha llibres en el historial.</p>
        ) : (
            <ul>
            {history.map((book) => (
                <li key={book.id}>
                {book.titol} - {book.autor}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    }