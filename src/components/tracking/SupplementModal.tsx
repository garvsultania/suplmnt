import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { icons } from 'lucide-react';

const iconOptions = [
  'Sun', 'Moon', 'Heart', 'Star', 'Apple', 'Droplet', 'Leaf', 'Pill', 'Smile', 'Zap', 'Coffee', 'Book', 'Dumbbell', 'Music', 'Feather', 'Globe', 'Check', 'Plus', 'Clock', 'AlertCircle',
];
const colorOptions = [
  'bg-mint', 'bg-coral', 'bg-sunny', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-500',
];

interface SupplementModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initial?: any;
}

const SupplementModal: React.FC<SupplementModalProps> = ({ open, onClose, onSave, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [icon, setIcon] = useState(initial?.icon || 'Pill');
  const [color, setColor] = useState(initial?.color || 'bg-mint');

  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setIcon(initial?.icon || 'Pill');
    setColor(initial?.color || 'bg-mint');
  }, [open, initial]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{initial ? 'Edit Supplement' : 'Add Supplement'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="e.g. Vitamin D3" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="e.g. Bone health, immunity" />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {iconOptions.map((iconName) => {
                  const Icon = icons[iconName];
                  return (
                    <button key={iconName} type="button" onClick={() => setIcon(iconName)} className={`rounded-lg p-2 border ${icon === iconName ? 'border-mint bg-mint/10' : 'border-transparent'}`}>
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Color</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((c) => (
                  <button key={c} type="button" onClick={() => setColor(c)} className={`w-7 h-7 rounded-full border-2 ${c} ${color === c ? 'border-slate-900' : 'border-transparent'}`}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave({ name, description, icon, color })}>{initial ? 'Save' : 'Add'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupplementModal; 