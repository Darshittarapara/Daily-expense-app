'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { fetchIncomes, deleteIncome } from '@/app/actions';
import { Income } from '@/types/income';
import { IncomeForm } from './IncomeForm';

interface IncomeViewProps {
  initialIncomes: Income[];
}

export const IncomeView: React.FC<IncomeViewProps> = ({ initialIncomes }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: incomes = initialIncomes, isLoading } = useQuery({
    queryKey: ['incomes'],
    queryFn: fetchIncomes,
    initialData: initialIncomes,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteIncome(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
    },
  });

  return (
    <div className="bg-base-100 p-6 shadow rounded-box">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Income</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Add Income
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount (₹)</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((inc) => (
                <tr key={inc.id}>
                  <td>{inc.name}</td>
                  <td>{inc.category}</td>
                  <td className="text-success font-semibold">+₹{inc.amount}</td>
                  <td>{inc.note}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-ghost text-error" onClick={() => deleteMutation.mutate(inc.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {incomes.length === 0 && (
                <tr><td colSpan={5} className="text-center text-base-content/50 py-4">No income records found.</td></tr>
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
                <h3 className="font-bold text-lg">Add New Income</h3>
                <button 
                  type="button" 
                  className="btn btn-sm btn-circle btn-ghost" 
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <IncomeForm 
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
