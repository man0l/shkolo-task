import { useEffect, useState } from 'react';
import { getButtons } from '../../services/buttonsSerivce';
import { HiMiniPlus } from "react-icons/hi2";


const ButtonsList = () => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        getButtons().then(setButtons);
    }, []);
    return (
        <div className="flex flex-col w-full p-4 md:p-6">
            <div className="text-2xl font-bold mb-6 md:mb-8 text-center md:text-left">SHKOLO</div>
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded-md items-center justify-center flex w-full aspect-2/1"
                    > <HiMiniPlus />
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ButtonsList;