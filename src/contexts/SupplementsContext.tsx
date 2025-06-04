import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Supplement {
  id: string;
  name: string;
  dosage: {
    amount: string;
    frequency: string;
    timing: string;
    notes?: string;
  };
  description: string;
  benefits: string[];
  sideEffects?: string[];
  dietaryInfo: {
    isVegetarian: boolean;
    isVegan: boolean;
    allergens?: string[];
  };
  purchaseLinks: {
    name: string;
    url: string;
    price?: string;
  }[];
  isFavorite: boolean;
  recommendationReason: string;
  lastTaken?: string;
  status: 'active' | 'paused' | 'completed';
  icon?: string;
}

// Define the structure for reminder settings
export interface ReminderSettings {
  enabled: boolean;
  time: string; // e.g., "09:00"
  frequency: 'daily' | 'weekly' | 'custom';
  days: string[]; // e.g., ['Mon', 'Wed', 'Fri']
}

// Define the structure for symptom tracking
export interface SymptomLog {
  date: string; // ISO string or YYYY-MM-DD
  score: number; // e.g., 1-10 scale, or specific symptom value
  notes?: string;
}

export interface SupplementWithTracking extends Supplement {
  reminderSettings?: ReminderSettings;
  symptomHistory?: SymptomLog[];
}


interface CartItem extends Supplement {
  quantity: number;
}

interface SupplementsContextType {
  supplements: SupplementWithTracking[]; // Use SupplementWithTracking here
  cart: CartItem[];
  favorites: Supplement[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleFavorite: (id: string) => void; // Toggle favorite by id
  markAsTaken: (id: string) => void; // Mark as taken by id
  clearCart: () => void;
  onPurchase: (id: string, link: Supplement['purchaseLinks'][0]) => void;
  updateReminderSettings: (id: string, settings: ReminderSettings) => void;
  logSymptom: (id: string, symptomLog: SymptomLog) => void;
}

const mockSupplements: SupplementWithTracking[] = [ // Use SupplementWithTracking for mock data
  {
    id: '1',
    name: 'Vitamin D3',
    description: 'Essential for bone health and immune function. Helps maintain optimal vitamin D levels.',
    dosage: {
      amount: '1000 IU',
      frequency: 'Once daily',
      timing: 'Morning with breakfast',
      notes: 'Take with a meal containing fat for better absorption'
    },
    benefits: [
      'Supports bone health',
      'Enhances immune function',
      'May improve mood and energy levels'
    ],
    sideEffects: [
      'Rare at recommended doses',
      'Excessive intake may cause hypercalcemia'
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      allergens: ['Soy']
    },
    purchaseLinks: [
      {
        name: '1mg',
        url: 'https://1mg.com/vitamin-d3',
        price: '₹499'
      },
      {
        name: 'HealthKart',
        url: 'https://healthkart.com/vitamin-d3',
        price: '₹450'
      },
      {
        name: 'Amazon',
        url: 'https://amazon.in/vitamin-d3',
        price: '₹475'
      }
    ],
    isFavorite: false,
    recommendationReason: 'Based on your recent lab report showing low vitamin D levels',
    status: 'active',
    icon: 'Sun', // Added icon
    reminderSettings: { enabled: false, time: '09:00', frequency: 'daily', days: [] }, // Added tracking fields
    symptomHistory: [] // Added tracking fields
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil',
    description: 'Rich in EPA and DHA, essential fatty acids that support heart and brain health.',
    dosage: {
      amount: '1000mg',
      frequency: 'Twice daily',
      timing: 'With meals',
      notes: 'Store in a cool, dry place'
    },
    benefits: [
      'Supports heart health',
      'Promotes brain function',
      'May reduce inflammation'
    ],
    sideEffects: [
      'Fishy aftertaste',
      'Mild digestive discomfort'
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false
    },
    purchaseLinks: [
      {
        name: '1mg',
        url: 'https://1mg.com/omega3',
        price: '₹899'
      },
      {
        name: 'HealthKart',
        url: 'https://healthkart.com/omega3',
        price: '₹850'
      }
    ],
    isFavorite: true,
    recommendationReason: 'Recommended for maintaining optimal heart health and reducing inflammation',
    status: 'active',
    icon: 'Droplet', // Added icon
    reminderSettings: { enabled: false, time: '09:00', frequency: 'daily', days: [] }, // Added tracking fields
    symptomHistory: [] // Added tracking fields
  }
];

const SupplementsContext = createContext<SupplementsContextType | undefined>(undefined);

export function SupplementsProvider({ children }: { children: ReactNode }) {
  const [supplements, setSupplements] = useState<SupplementWithTracking[]>(mockSupplements);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Supplement[]>([]); // Keep favorites as Supplement[] if it only stores basic info

  // Add cart management functions
  const addToCart = useCallback((item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

   // Modify toggleFavorite to work with id
  const toggleFavorite = useCallback((id: string) => {
    setSupplements(prev =>
      prev.map(supplement =>
        supplement.id === id
          ? { ...supplement, isFavorite: !supplement.isFavorite }
          : supplement
      )
    );
    // Also update favorites list if needed, based on how you use it
     setFavorites(prev => {
        const existingFavorite = prev.find(fav => fav.id === id);
        const supplementToFav = supplements.find(supp => supp.id === id);
        if (existingFavorite) {
            return prev.filter(fav => fav.id !== id);
        } else if (supplementToFav) {
            return [...prev, supplementToFav];
        }
        return prev;
     });
  }, [supplements]); // Added supplements to dependency array


  // Modify markAsTaken to work with id and update SupplementWithTracking state
  const markAsTaken = useCallback((id: string) => {
    setSupplements(prevSupplements =>
      prevSupplements.map(supplement =>
        supplement.id === id ? { ...supplement, lastTaken: new Date().toISOString() } : supplement
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Add reminder settings and symptom logging functions
  const updateReminderSettings = useCallback((id: string, settings: ReminderSettings) => {
    setSupplements(prev =>
      prev.map(supplement =>
        supplement.id === id ? { ...supplement, reminderSettings: settings } : supplement
      )
    );
  }, []);

  const logSymptom = useCallback((id: string, symptomLog: SymptomLog) => {
    setSupplements(prev =>
      prev.map(supplement =>
        supplement.id === id
          ? {
              ...supplement,
              symptomHistory: [
                ...(supplement.symptomHistory || []),
                symptomLog
              ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            }
          : supplement
      )
    );
  }, []);

  const onPurchase = useCallback((id: string, link: Supplement['purchaseLinks'][0]) => {
    window.open(link.url, '_blank');
  }, []);


  return (
    <SupplementsContext.Provider
      value={{
        supplements,
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        markAsTaken,
        clearCart,
        onPurchase,
        updateReminderSettings,
        logSymptom,
      }}
    >
      {children}
    </SupplementsContext.Provider>
  );
}

export function useSupplements() {
  const context = useContext(SupplementsContext);
  if (context === undefined) {
    throw new Error('useSupplements must be used within a SupplementsProvider');
  }
  return context;
}