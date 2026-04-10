import { useState, useEffect } from 'react';
import { z } from 'zod';
import BookingService from '../services/BookingService';
import { useBooking } from '../context/BookingContext'; 
import styles from './BookingForm.module.css';

const bookingSchema = z.object({
  fullName: z.string()
    .min(3, "Мінімум 3 символи")
    .regex(/^[а-яА-ЯіІїЇєЄ\s]+$/, "Тільки укр. літери"),
  phone: z.string()
    .regex(/^\+?[0-9]{10,12}$/, "Невірний формат (напр. 0951234567)"),
  email: z.string()
    .email("Введіть коректну електронну адресу")
});

const InternalModal = ({ children, onClose }) => (
  <div className={styles.backdrop} onClick={onClose}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeBtn} onClick={onClose}>&times;</button>
      {children}
    </div>
  </div>
);

const BookingForm = ({ isOpen, onClose, wagon, selectedSeats, onSuccess }) => {
  const { addBooking } = useBooking(); 
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ fullName: '', phone: '', email: '' });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        fullName: formatted.fullName?._errors[0],
        phone: formatted.phone?._errors[0],
        email: formatted.email?._errors[0]
      });
      return;
    }

    try {
      const bookingData = {
        trainId: wagon.trainId,
        wagonId: wagon.id,
        seats: selectedSeats,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        date: new Date().toISOString()
      };

      await BookingService.createBooking(bookingData);
      
      addBooking(bookingData); 
      
      alert('Бронювання успішне!');
      onSuccess(); 
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Помилка при збереженні');
    }
  };

  return (
    <InternalModal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Оформлення квитків</h2>
        <div className={styles.details}>
          <p><strong>Вагон:</strong> №{wagon?.number} ({wagon?.type})</p>
          <p><strong>Місця:</strong> {selectedSeats?.join(', ')}</p>
        </div>
        
        <div className={styles.inputGroup}>
          <label>ПІБ пасажира</label>
          <input 
            type="text"
            placeholder="Прізвище та ім'я" 
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            className={errors.fullName ? styles.inputError : ''}
          />
          {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Номер телефону</label>
          <input 
            type="text"
            placeholder="0XXXXXXXXX" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email"
            placeholder="example@mail.com" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>Підтвердити</button>
          <button type="button" onClick={onClose} className={styles.cancelBtn}>Скасувати</button>
        </div>
      </form>
    </InternalModal>
  );
};

export default BookingForm;