import { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [myBookings, setMyBookings] = useState([]); 

  const addBooking = (newBooking) => {
    setMyBookings((prev) => [...prev, newBooking]);
    const saved = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    localStorage.setItem('user_bookings', JSON.stringify([...saved, newBooking]));
  };

  return (
    <BookingContext.Provider value={{ myBookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);