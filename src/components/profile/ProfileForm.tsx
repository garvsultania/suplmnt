import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user'; // Assuming types directory
import { Button } from '@/components/ui/button'; // Reusing shadcn button

interface ProfileFormProps {
  initialData: UserProfile;
  onSave: (data: Partial<UserProfile>) => Promise<void>; // Use Partial for updates
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSave,
  isLoading,
  error,
  success,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }
    // Add other field validations as needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
      await onSave(formData);
      setIsEditing(false); // Exit editing mode on successful save
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
           {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
           {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-600">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age ?? ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-600">Gender</label>
           <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
           >
             <option value="">Select Gender</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             <option value="other">Other</option>
             <option value="prefer-not-to-say">Prefer not to say</option>
           </select>
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-600">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height ?? ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-600">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight ?? ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-600">Dietary Preference</label>
           <input
            type="text"
            name="dietaryPreference"
            value={formData.dietaryPreference || ''}
            onChange={handleInputChange}
            disabled={!isEditing || isLoading}
             className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint focus:ring-mint sm:text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
        </div>
      </div>

       {/* Feedback Messages */}
      {isLoading && <p className="text-blue-600 text-sm">Saving...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}


      <div className="flex justify-end gap-3">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => {setIsEditing(false); setFormData(initialData); setFormErrors({});}} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSaveClick} disabled={isLoading}>
              Save
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} disabled={isLoading}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm; 