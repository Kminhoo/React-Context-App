import React, { useContext, useEffect, useState } from 'react'

import { OrderContext } from '../../context/OrderContext'

import axios from 'axios'

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]) //포스트의 response를 담을 state
  const [loading, setLoading] = useState(true)
  const [orderData] = useContext(OrderContext)

  useEffect(() => {
    orderCompleted(orderData)
  }, [orderData])
  
  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:4000/order', orderData)
      setOrderHistory(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const orderTable = orderHistory.map((item, key) => (
    <tr key={item.orderNumber}>
      <th>{item.orderNumber}</th>
      <th>{item.price}</th>
    </tr>
  ))

  if(loading) {
    return <div>...Loading</div>
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <th>Number</th>
              <th>Price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <br />
        <button onClick={() => setStep(0)} className='rainbow rainbow-1'>
          첫페이지로
        </button>
      </div>
    )
  }
}

export default CompletePage