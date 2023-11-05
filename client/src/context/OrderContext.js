import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext(); //context 객체를 생성

export function OrderContextProvider (props) {

  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map()
  })

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0
  })

  const pricePerItem = {
    products: 1000,
    options: 500
  }

  const calculateSubTotal = (orderType, orderCounts) => {
    let optionCount = 0
    for (const count of orderCounts[orderType].values()) {
      optionCount += count
    }

    return optionCount * pricePerItem[orderType]
  }

  useEffect(() => {
    const productsTotal = calculateSubTotal('products', orderCounts)
    const optionsTotal = calculateSubTotal('options', orderCounts)
    const total = productsTotal + optionsTotal
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total
    })
  }, [orderCounts])

  const value = useMemo(() => {
    function updateItemCount (itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts }
      console.log('newOrderCount before', newOrderCounts)

      const orderCountsMap = orderCounts[orderType]
      orderCountsMap.set(itemName, parseInt(newItemCount))

      console.log('newOrderCount after', newOrderCounts)
      orderCountsMap.set(itemName, parseInt(newItemCount))
      setOrderCounts(newOrderCounts)
    }
    return [{ ...orderCounts, totals }, updateItemCount]
  }, [orderCounts, totals])

  return <OrderContext.Provider value={value} {...props} />
}