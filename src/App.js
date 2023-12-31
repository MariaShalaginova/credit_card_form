import { useState } from "react";
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from "@hookform/error-message";

function App() {

 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Обработка данных формы
    setIsSubmitting(true);
  };

  return (
    <div>
      <h2>Заполните все поля кредитной карты</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="cardHolder">Держатель карты:</label>
          
          <input
            className={errors.cardHolder && 'invalid'}
            {...register('cardHolder', { required: true, pattern: /^[A-Za-z]+$/i, minLength: 2 }) }
            aria-invalid={errors.cardHolder? "true" : "false"}
          />
        </div>

        {errors.cardHolder && <p>Поле должно содержать только латинские буквы</p>}
        
        <div>
          <label htmlFor="cardNumber">Номер карты:</label>
          <input 
            className={errors.cardNumber && 'invalid'}
            {...register("cardNumber", { required: true, pattern: /^[0-9]{16}$/})}
          />
        </div>

        {errors.cardNumber && <p>Номер карты должен состоять из 16 цифр.</p>}

        <div>
          <label htmlFor="expiryDate">Срок действия:</label>
          <input
            className={errors.expiryDate && 'invalid'} 
            {...register("expiryDate", { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ })}
           />
        </div>

        {errors.expiryDate && <p>Неверный формат срока действия</p>}

        <div>
          <label htmlFor="cvv">CVV код:</label>
          <input 
            className={errors.cvv && 'invalid'}
            {...register("cvv", { required: true, pattern: /^[0-9]{3}$/ })}
          />
        </div>

        {errors.cvv && <p>CVV код должен состоять из 3 цифр</p>}

        <button type="submit">Отправить</button>
        
      </form>
    </div>
  );
}

export default App;
