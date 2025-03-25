import { useParams } from 'react-router-dom';
import { createButton } from '../../services/buttonsSerivce';
import Layout from '../Layout';
import ButtonForm from './ButtonForm';

const AddButton = () => {
    const { order } = useParams();
    
    const initialButton = {
        title: '',
        link: '',
        color: '',
        order: order ? parseInt(order) : 1,
    };

    const handleSubmit = async (buttonData) => {
        return await createButton(buttonData);
    };

    return (
        <Layout>
            <ButtonForm
                initialButton={initialButton}
                onSubmit={handleSubmit}
                title={`Add Button ${order}`}
                submitButtonText="Add Button"
            />
        </Layout>
    );
};

export default AddButton;