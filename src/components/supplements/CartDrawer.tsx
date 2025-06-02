import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useSupplements } from '../../contexts/SupplementsContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useSupplements();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * 499), 0); // Placeholder price of ₹499

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.dosage}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-sm font-medium text-gray-900">
                      ₹{item.quantity * 499}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Total Items:</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold">₹{subtotal}</span>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                // Simulate checkout
                alert('Proceeding to checkout...');
                clearCart();
                onClose();
              }}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                clearCart();
                onClose();
              }}
              className="w-full py-3 px-4 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 