import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { FormInput } from '../components/ui/FormInput';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { User, LogOut, Mail, Bell, Moon, Sun, Camera } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  height?: string;
  weight?: string;
}

export function Profile() {
  const { profile, updateProfile, isEditing, setIsEditing } = useProfile();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState(profile);
  const [showToast, setShowToast] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Age must be between 0 and 120';
    }
    
    if (formData.height < 0 || formData.height > 300) {
      newErrors.height = 'Height must be between 0 and 300 cm';
    }
    
    if (formData.weight < 0 || formData.weight > 500) {
      newErrors.weight = 'Weight must be between 0 and 500 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile(formData);
      setIsEditing(false);
      setShowToast('Profile saved!');
      setTimeout(() => setShowToast(null), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value
    }));
  };

  const handleLogout = () => {
    setShowToast('Logged out!');
    setTimeout(() => setShowToast(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-main pb-28 flex flex-col safe-area-padding">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-mint text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          {showToast}
        </div>
      )}

      {/* Profile Header */}
      <div className="glass m-3 p-5 rounded-3xl flex flex-col items-center relative">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-mint via-sunny to-coral flex items-center justify-center shadow-float">
            <User className="icon-lg icon-white" aria-label="User avatar" />
          </div>
          <button 
            className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1 shadow-md border border-white hover:bg-mint/80 transition-colors" 
            aria-label="Change avatar"
          >
            <Camera className="icon-premium icon-accent" />
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-slate mb-0.5 text-center break-words">
          {formData.name || 'Your Name'}
        </h1>
        <p className="text-base sm:text-lg text-slate/70 font-inter mb-1 text-center break-all">
          {formData.email || 'your.email@example.com'}
        </p>
      </div>

      {/* Profile Settings */}
      <div className="glass m-3 p-5 rounded-3xl space-y-5">
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-slate/80 font-inter text-base">
            <Bell className="icon-premium icon-accent" aria-hidden /> Notifications
          </span>
          <button
            className="w-14 h-8 rounded-full flex items-center bg-slate/30 relative transition-colors duration-300 focus:ring-2 focus:ring-mint"
            aria-label="Toggle notifications"
          >
            <span className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300"></span>
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-slate/80 font-inter text-base">
            <Sun className="icon-premium text-sunny" aria-hidden /> Theme
          </span>
          <button
            className="w-14 h-8 rounded-full flex items-center bg-slate/30 relative transition-colors duration-300 focus:ring-2 focus:ring-mint"
            aria-label="Toggle theme"
          >
            <span className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300"></span>
          </button>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="w-full btn-glass btn-primary mt-4 py-4 rounded-2xl font-semibold text-lg shadow-lg focus:ring-2 focus:ring-mint"
          aria-label="Edit profile"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormInput
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <FormInput
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                error={errors.height}
              />

              <FormInput
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                error={errors.weight}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Preference
                </label>
                <select
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="non-vegetarian">Non-vegetarian</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                    setErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-mint text-white rounded-md hover:bg-mint/90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Out Button */}
      <div className="glass m-3 p-5 rounded-3xl flex justify-center">
        <button
          className="flex items-center gap-2 text-coral font-semibold text-lg px-6 py-3 rounded-xl hover:bg-coral/10 transition-colors focus:ring-2 focus:ring-coral"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut className="icon-premium text-coral" /> Log Out
        </button>
      </div>

      <div className="bottom-nav-spacer" />
      <BottomNavigation />
    </div>
  );
}
