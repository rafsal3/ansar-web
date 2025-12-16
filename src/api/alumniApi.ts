import apiClient from './apiClient';

export interface AlumniRegisterData {
    name: string;
    email: string;
    phone: string;
    course: string;
    startYear: string;
    endYear: string;
    className: string;
    password: string;
    confirmPassword: string;
    jobId: string;
    photos: File;
}

export const alumniApi = {
    register: async (data: AlumniRegisterData) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key === 'photos') {
                formData.append('photos', data.photos);
            } else {
                formData.append(key, data[key as keyof AlumniRegisterData] as string);
            }
        });

        const response = await apiClient.post('/alumini/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
