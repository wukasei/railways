import axios from 'axios';
import { API_URL } from '../data/trains';

const BookingService = {
    getTrainById: async(id) => {
        const response = await axios.get(`${API_URL}/trains/${id}`);
        return response.data
    },
    getWagonByTrainId: async (trainId) => {
        const response = await axios.get(`${API_URL}/wagons`);
        const filteredWagons = response.data.filter(wagon => 
            String(wagon.trainId) === String(trainId)
        );
        return filteredWagons;
    },
    createBooking: async(bookingData) => {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data
    },
    getAllBookings: async () => {
        const response = await axios.get(`${API_URL}/bookings`);
        return response.data;
    }
}

export default BookingService