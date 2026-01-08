import React from 'react'

interface Props {
  orderId: number
  totalAmount: number
  paymentUrl: string
}
const PayOrderTemplate = ({
  orderId,
  totalAmount,
  paymentUrl
}:Props) => {
  return (
    <div>
      <h1>Заказ №{orderId}</h1>
      <p>
        Сумма заказа {totalAmount} руб.
      </p>
      <p>
        Перейдите по <a href={paymentUrl}>ссылке</a> для оплаты заказа
      </p>
    </div>
  )
}

export default PayOrderTemplate;