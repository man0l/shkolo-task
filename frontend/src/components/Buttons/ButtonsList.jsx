import { useEffect, useState } from 'react';
import { getButtons } from '../../services/buttonsSerivce';
import { HiMiniPlus } from "react-icons/hi2";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Layout from '../Layout';

const ButtonsList = () => {
    const [buttons, setButtons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchButtons = async () => {
            try {
                const fetchedButtons = await getButtons();
                setButtons(fetchedButtons);
            } catch (error) {
                console.error("Error fetching buttons:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchButtons();
    }, []);

    const getButtonForPosition = (position) => {
        return buttons.find(button => button.order === position);
    };

    return (
        <Layout>            
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 9 }).map((_, index) => {
                    const position = index + 1;
                    const buttonForThisPosition = getButtonForPosition(position);
                    
                    return (
                        <div
                            key={index}
                            className="bg-gray-200 rounded-md items-center justify-center flex w-full aspect-2/1"
                        >
                        {buttonForThisPosition ? (
                            <Link to={buttonForThisPosition.link} className="flex flex-col items-center">
                                <HiOutlineArrowTopRightOnSquare />
                                <span className="text-sm mt-1">Order: {buttonForThisPosition.order}</span>
                            </Link>
                        ) : (
                            <Link to={`/button/add/${position}`} className="flex flex-col items-center">
                                <HiMiniPlus />
                                <span className="text-sm mt-1">Position: {position}</span>
                            </Link>
                        )}
                        </div>
                    );
                })}
                </div>
            </div>
        </Layout>
    )
}

export default ButtonsList;