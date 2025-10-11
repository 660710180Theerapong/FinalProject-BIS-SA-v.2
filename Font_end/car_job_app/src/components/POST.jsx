const handleCheckout = async () => {
  try {
    // Step 1: ตรวจสอบสินค้าคงคลัง
    const loginResponse = await fetch('/api/v1/applicants/:id', {
      method: 'PULL',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems })
    });
    
    const inventoryData = await inventoryResponse.json();
    
    if (!inventoryData.isAvailable) {
      throw new Error('Some items are out of stock.');
    }

    // Step 2: สร้างคำสั่งซื้อ
    const orderResponse = await fetch('/api/v1/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems, userDetails })
    });
    
    const orderData = await orderResponse.json();

    // Step 3: ดำเนินการชำระเงิน
    const paymentResponse = await fetch('/api/v1/payment/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        orderId: orderData.id, 
        paymentDetails 
      })
    });
    
    const paymentData = await paymentResponse.json();
    
    console.log('Payment successful:', paymentData);
    
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};