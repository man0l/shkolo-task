import { useEffect, useState } from 'react';
import { getButtons } from '../../services/buttonsSerivce';
import { HiMiniPlus } from "react-icons/hi2";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Layout from '../Layout';

const ButtonsList = () => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        getButtons().then(setButtons);
    }, []);
    return (
        <Layout>            
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 rounded-md items-center justify-center flex w-full aspect-2/1"
                        >
                        {buttons[index + 1] ? (
                            <Link to={buttons[index + 1].link}>
                                <HiOutlineArrowTopRightOnSquare />
                            </Link>
                        ) : (
                            <Link to={`/button/add/${index}`}>
                                <HiMiniPlus />
                            </Link>
                        )}
                        
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ButtonsList;