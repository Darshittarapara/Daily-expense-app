'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { fetchCategories, deleteCategory } from '@/app/actions';
import { Category } from '@/types/category';
import { CategoryForm } from './CategoryForm';

interface CategoryViewProps {
  initialCategories: Category[];
}

export const CategoryView: React.FC<CategoryViewProps> = ({ initialCategories }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories = initialCategories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    initialData: initialCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return (
    <div className="bg-base-100 p-6 shadow rounded-box">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    {cat.icon ? <img src={cat.icon} alt="icon" className="w-8 h-8 object-contain" /> : <div className="w-8 h-8 bg-base-300 rounded-full" />}
                  </td>
                  <td className="font-semibold">{cat.name}</td>
                  <td>
                    <span className={`badge ${cat.type.toLowerCase() === 'income' ? 'badge-success' : 'badge-error'} badge-sm`}>
                      {cat.type}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-ghost text-error" onClick={() => deleteMutation.mutate(cat.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={4} className="text-center text-base-content/50 py-4">No categories found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Drawer (Right Side) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)} 
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-md flex animate-in slide-in-from-right duration-300">
            <div className="w-full h-full bg-base-100 shadow-2xl flex flex-col">
              <div className="p-6 border-b border-base-300 flex justify-between items-center">
                <h3 className="font-bold text-lg">Add New Category</h3>
                <button 
                  type="button" 
                  className="btn btn-sm btn-circle btn-ghost" 
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <CategoryForm 
                  onSuccess={() => setIsModalOpen(false)} 
                  onCancel={() => setIsModalOpen(false)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
