'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { fetchExpenses, deleteExpense } from '@/app/actions';
import { Expense } from '@/types/expense';
import { ExpenseForm } from './ExpenseForm';

interface ExpenseViewProps {
  initialExpenses: Expense[];
}

export const ExpenseView: React.FC<ExpenseViewProps> = ({ initialExpenses }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: expenses = initialExpenses, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
    initialData: initialExpenses,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  return (
    <div className="bg-base-100 p-6 shadow rounded-box">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Add Expense
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
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.name}</td>
                  <td>{exp.category}</td>
                  <td className="text-error font-semibold">-₹{exp.amount}</td>
                  <td>{exp.note}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-ghost text-error" onClick={() => deleteMutation.mutate(exp.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr><td colSpan={5} className="text-center text-base-content/50 py-4">No expense records found.</td></tr>
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
                <h3 className="font-bold text-lg">Add New Expense</h3>
                <button 
                  type="button" 
                  className="btn btn-sm btn-circle btn-ghost" 
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <ExpenseForm 
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
