const API_URL = import.meta.env.VITE_API_URL;

export const getButtons = async () => {
    const response = await fetch(`${API_URL}/buttons`, {
        redirect: 'follow'
    });
    return response.json();
}

export const createButton = async (button) => {

    const response = await fetch(`${API_URL}/buttons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(button),
        redirect: 'follow'
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
            errorData = JSON.parse(errorText);
        } catch (e) {
            throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
        }
        throw errorData;
    }
    
    return await response.json();
}

export const updateButton = async (button) => {    
    const response = await fetch(`${API_URL}/buttons/${button.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(button),
        redirect: 'follow'
    });
    return response.json();
}

export const deleteButton = async (id) => {
    const response = await fetch(`${API_URL}/buttons/${id}`, {
        method: 'DELETE',
        redirect: 'follow'
    });
    return response.json();
}

export const getButton = async (id) => {
    const response = await fetch(`${API_URL}/buttons/${id}`, {
        redirect: 'follow'
    });
    return response.json();
}