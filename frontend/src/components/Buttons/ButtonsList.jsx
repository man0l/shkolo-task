import { useEffect, useState } from 'react';
import { getButtons } from '../../services/buttonsSerivce';

const ButtonsList = () => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        getButtons().then(setButtons);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Buttons List</h1>
            <ul className="flex flex-col gap-4">
                {buttons.map((button) => (
                    <li key={button.id} className="bg-gray-100 p-4 rounded-md size-32">{button.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default ButtonsList;