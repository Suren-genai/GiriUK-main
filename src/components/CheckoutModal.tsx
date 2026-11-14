import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Lock, Truck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem, Coupon, Order, CustomerAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderPlaced,
  onClearCart,
  onTrackOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address State
  const [address, setAddress] = useState<CustomerAddress>({
    fullName: 'Suren Murugesan',
    email: 'suren.genaiarchitect@gmail.com',
    phone: '+44 7700 900123',
    addressLine1: '18 Station Road, Harrow',
    city: 'London',
    postcode: 'HA1 2TU',
    country: 'United Kingdom'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'Royal Mail 48 Tracked' | 'DPD Next Day Express' | 'EU International Tracked'>('Royal Mail 48 Tracked');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'Credit/Debit Card' | 'PayPal' | 'Apple Pay'>('Credit/Debit Card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('882');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  
  let shippingCost = 0;
  if (shippingMethod === 'Royal Mail 48 Tracked') {
    shippingCost = subtotal >= 50 ? 0 : 3.99;
  } else if (shippingMethod === 'DPD Next Day Express') {
    shippingCost = 5.99;
  } else if (shippingMethod === 'EU International Tracked') {
    shippingCost = 9.99;
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderNumber = `GIRI-UK-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generatedOrderNumber,
        createdAt: new Date().toISOString().split('T')[0],
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee: shippingCost,
        total: grandTotal,
        couponCode: appliedCoupon?.code,
        status: 'Processing',
        shippingAddress: address,
        shippingMethod,
        trackingNumber: `GB-${shippingMethod === 'DPD Next Day Express' ? 'DPD' : 'RM'}-${Math.floor(100000000 + Math.random() * 900000000)}`,
        estimatedDelivery: shippingMethod === 'DPD Next Day Express' ? 'Tomorrow by 1 PM' : '2-3 Business Days',
        paymentMethod
      };

      onOrderPlaced(newOrder);
      setConfirmedOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FAF7F0] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#164E45]" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              {confirmedOrder ? 'Order Confirmation' : 'GIRI UK · Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">Auspicious Blessings</span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Thank you for your order!</h3>
              <p className="text-sm text-stone-600 mt-2">
                Order reference: <strong className="text-[#164E45] font-mono text-base">{confirmedOrder.orderNumber}</strong>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                A confirmation receipt and VAT invoice have been dispatched to <strong>{confirmedOrder.shippingAddress.email}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF7F0] rounded-xl p-4 sm:p-5 border border-stone-200 text-left max-w-lg mx-auto text-xs space-y-2">
              <div className="flex justify-between font-medium text-stone-700 pb-2 border-b border-stone-200">
                <span>Dispatch Carrier</span>
                <span className="font-semibold text-[#164E45]">{confirmedOrder.shippingMethod}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tracking Number</span>
                <span className="font-mono text-stone-800">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Arrival</span>
                <span className="font-semibold text-stone-800">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Address</span>
                <span className="text-right text-stone-800">
                  {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.city} {confirmedOrder.shippingAddress.postcode}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Paid via {confirmedOrder.paymentMethod}</span>
                <span className="text-[#164E45] font-mono">£{confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onTrackOrder(confirmedOrder.orderNumber);
                }}
                className="px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-[#ffdb96]" />
                <span>Track My Parcel Now</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Step Stepper */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-8 text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#164E45]' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#164E45] text-white' : 'bg-stone-200'}`}>1</span>
                <span>Address</span>
              </div>
              <span className="h-0.5 w-12 bg-stone-200" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#164E45]' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#164E45] text-white' : 'bg-stone-200'}`}>2</span>
                <span>Delivery</span>
              </div>
              <span className="h-0.5 w-12 bg-stone-200" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#164E45]' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#164E45] text-white' : 'bg-stone-200'}`}>3</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-4 max-w-lg mx-auto">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-stone-500">
                  UK &amp; European Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Phone Number (For Tracking Updates) *</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Country</label>
                    <select
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    >
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-stone-600 mb-1 font-medium">Street Address *</label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    placeholder="e.g. 18 Station Road"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Town / City *</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Postcode *</label>
                    <input
                      type="text"
                      value={address.postcode}
                      onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45] uppercase"
                      placeholder="e.g. HA1 2TU"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <div className="space-y-4 max-w-lg mx-auto">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-stone-500">
                  Select UK / European Shipping Carrier
                </h3>

                <div className="space-y-2.5">
                  <label
                    onClick={() => setShippingMethod('Royal Mail 48 Tracked')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'Royal Mail 48 Tracked'
                        ? 'border-[#164E45] bg-[#164E45]/5 ring-1 ring-[#164E45]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#164E45]" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">Royal Mail 48 Tracked (Standard UK)</p>
                        <p className="text-[11px] text-stone-500">Delivered within 2–3 business days with SMS notifications</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#164E45]">
                      {subtotal >= 50 ? 'FREE' : '£3.99'}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('DPD Next Day Express')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'DPD Next Day Express'
                        ? 'border-[#164E45] bg-[#164E45]/5 ring-1 ring-[#164E45]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#B99A5B]" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">DPD Next Working Day Express</p>
                        <p className="text-[11px] text-stone-500">Order by 2 PM for next working day 1-hour delivery slot</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800">£5.99</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('EU International Tracked')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'EU International Tracked'
                        ? 'border-[#164E45] bg-[#164E45]/5 ring-1 ring-[#164E45]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-stone-500" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">European Tracked Courier</p>
                        <p className="text-[11px] text-stone-500">Delivery across France, Germany, Netherlands, Ireland (4-6 days)</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800">£9.99</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4 max-w-lg mx-auto">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-stone-500">
                  Select Secure Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit/Debit Card')}
                    className={`p-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'Credit/Debit Card'
                        ? 'border-[#164E45] bg-[#164E45]/5 text-[#164E45] ring-1 ring-[#164E45]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PayPal')}
                    className={`p-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'PayPal'
                        ? 'border-[#164E45] bg-[#164E45]/5 text-[#164E45] ring-1 ring-[#164E45]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Apple Pay')}
                    className={`p-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'Apple Pay'
                        ? 'border-[#164E45] bg-[#164E45]/5 text-[#164E45] ring-1 ring-[#164E45]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    Apple Pay
                  </button>
                </div>

                {paymentMethod === 'Credit/Debit Card' && (
                  <div className="bg-[#FAF7F0] p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Card Number (Visa, MC, Amex)</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">Expiry MM/YY</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'PayPal' && (
                  <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 text-center">
                    You will be securely redirected to PayPal to complete your purchase in GBP.
                  </div>
                )}

                {paymentMethod === 'Apple Pay' && (
                  <div className="p-4 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-800 text-center">
                    Double-click your Apple side button or authenticate via Touch ID / Face ID.
                  </div>
                )}

                {/* Final Order Review Row */}
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal ({items.length} items)</span>
                    <span className="font-mono">£{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({appliedCoupon?.code})</span>
                      <span className="font-mono">-£{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping ({shippingMethod})</span>
                    <span className="font-mono">
                      {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                    <span>Order Total</span>
                    <span className="text-base text-[#164E45] font-mono tabular-nums">
                      £{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Authorising Payment...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#ffdb96]" />
                        <span>Pay £{grandTotal.toFixed(2)} &amp; Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
