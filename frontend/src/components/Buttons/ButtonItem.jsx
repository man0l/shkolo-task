import { useState } from 'react';
import { HiMiniPlus, HiOutlineArrowTopRightOnSquare, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const ButtonItem = ({ position, buttonForThisPosition, onDeleteButton }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (confirm(`Are you sure you want to delete button ${buttonForThisPosition.order}?`)) {
            try {
                setIsDeleting(true);
                await onDeleteButton(buttonForThisPosition.id);                
            } catch (error) {
                console.error("Error in delete handler:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div
            className="bg-gray-200 rounded-md items-center justify-center flex w-full aspect-2/1 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {buttonForThisPosition ? (
                <>
                    <Link to={buttonForThisPosition.link} className="flex flex-col items-center" style={{ color: buttonForThisPosition.color }}>
                        <HiOutlineArrowTopRightOnSquare />  
                        <span className="text-sm mt-1">{buttonForThisPosition.title}</span>
                    </Link>
                    
                    {isHovered && (
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-2 bg-gray-800 bg-opacity-60 text-white transition-all duration-600 ease-in-out">
                            <Link 
                                to={`/button/edit/${buttonForThisPosition.id}`} 
                                className="hover:text-blue-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <HiMiniPencil size={18} />
                            </Link>
                            <button 
                                className={`hover:text-red-400 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <span className="animate-pulse">...</span>
                                ) : (
                                    <HiMiniTrash size={18} />
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <Link to={`/button/add/${position}`} className="flex flex-col items-center">
                    <HiMiniPlus />
                </Link>
            )}
        </div>
    );
};

export default ButtonItem;
