const API_URL = import.meta.env.VITE_API_URL;

export const getButtons = async () => {
    const response = await fetch(`${API_URL}/buttons`);
    return response.json();
}

export const createButton = async (button) => {
    const response = await fetch(`${API_URL}/buttons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(button),
    });
    return response.json();
}

export const updateButton = async (button) => {
    const response = await fetch(`${API_URL}/buttons/${button.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(button),
    });
    return response.json();
}

export const deleteButton = async (id) => {
    const response = await fetch(`${API_URL}/buttons/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}

export const getButton = async (id) => {
    const response = await fetch(`${API_URL}/buttons/${id}`);
    return response.json();
}