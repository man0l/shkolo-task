import { useEffect, useState } from 'react';
import { getButtons, deleteButton } from '../../services/buttonsSerivce';
import ButtonItem from './ButtonItem';
import Layout from '../Layout';

const ButtonsList = () => {
    const [buttons, setButtons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchButtons = async () => {
            try {
                const fetchedButtons = await getButtons();
                setButtons(fetchedButtons);
            } catch (error) {
                console.error("Error fetching buttons:", error);
                showNotification("Failed to load buttons", "error");
            } finally {
                setLoading(false);
            }
        };
        
        fetchButtons();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const getButtonForPosition = (position) => {
        return buttons.find(button => button.order === position);
    };

    const handleDeleteButton = async (buttonId) => {
        try {
            const result = await deleteButton(buttonId);
            if (result) {
                // Update local state by filtering out the deleted button
                setButtons(prevButtons => prevButtons.filter(button => button.id !== buttonId));
                showNotification("Button deleted successfully");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting button:", error);
            showNotification("Failed to delete button. Please try again.", "error");
            return false;
        }
    };

    return (
        <Layout>            
            <div className="w-full max-w-6xl mx-auto">
                {notification && (
                    <div className={`mb-4 p-3 rounded ${notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {notification.message}
                    </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 9 }).map((_, index) => {
                    const position = index + 1;
                    const buttonForThisPosition = getButtonForPosition(position);
                    
                    return (
                        <ButtonItem 
                            key={index}
                            position={position}
                            buttonForThisPosition={buttonForThisPosition}
                            onDeleteButton={handleDeleteButton}
                        />
                    );
                })}
                </div>
            </div>
        </Layout>
    )
}

export default ButtonsList;