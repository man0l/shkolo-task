import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateButton, getButton } from '../../services/buttonsSerivce';
import Layout from '../Layout';
import ButtonForm from './ButtonForm';

const EditButton = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [buttonData, setButtonData] = useState({
        title: '',
        link: '',
        color: '',
        order: 1,
        id: ''
    });
    
    useEffect(() => {
        const fetchButton = async () => {
            try {
                const data = await getButton(id);
                setButtonData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching button:', error);
                setLoading(false);
            }
        };

        fetchButton();
    }, [id]);

    const handleSubmit = async (buttonData) => {
        return await updateButton(buttonData);
    };

    return (
        <Layout>
            <ButtonForm
                initialButton={buttonData}
                onSubmit={handleSubmit}
                title="Edit Button"
                submitButtonText="Update Button"
                isLoading={loading}
            />
        </Layout>
    );
};

export default EditButton; 