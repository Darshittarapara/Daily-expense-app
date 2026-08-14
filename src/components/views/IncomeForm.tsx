'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/shared/Input';
import { Income } from '@/types/income';
import { addIncome } from '@/app/actions';

interface IncomeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const IncomeForm: React.FC<IncomeFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Income, 'id' | 'date' | 'month'>>();

  const addMutation = useMutation({
    mutationFn: async (data: Omit<Income, 'id' | 'date' | 'month'>) => {
      await addIncome({
        ...data,
        date: new Date().toISOString(),
        month: new Date().getMonth().toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      reset();
      onSuccess();
    },
  });

  const onSubmit = (data: Omit<Income, 'id' | 'date' | 'month'>) => {
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="E.g. Salary"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <Input
        type="number"
        label="Amount (₹)"
        placeholder="50000"
        error={errors.amount?.message}
        {...register('amount', { required: 'Amount is required', valueAsNumber: true })}
      />
      <Input
        label="Category"
        placeholder="E.g. Job"
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
