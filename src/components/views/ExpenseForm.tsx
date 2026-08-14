'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/shared/Input';
import { Expense } from '@/types/expense';
import { addExpense } from '@/app/actions';

interface ExpenseFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Expense, 'id' | 'date' | 'month'>>();

  const addMutation = useMutation({
    mutationFn: async (data: Omit<Expense, 'id' | 'date' | 'month'>) => {
      await addExpense({
        ...data,
        date: new Date().toISOString(),
        month: new Date().getMonth().toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      reset();
      onSuccess();
    },
  });

  const onSubmit = (data: Omit<Expense, 'id' | 'date' | 'month'>) => {
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="E.g. Groceries"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <Input
        type="number"
        label="Amount (₹)"
        placeholder="500"
        error={errors.amount?.message}
        {...register('amount', { required: 'Amount is required', valueAsNumber: true })}
      />
      <Input
        label="Category"
        placeholder="E.g. Food"
        error={errors.category?.message}
        {...register('category', { required: 'Category is required' })}
      />
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Note</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Optional notes"
          {...register('note')}
        />
      </div>
      <div className="pt-4 flex justify-end gap-2">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};
