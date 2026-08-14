'use server';

import { Expense } from '@/types/expense';
import { Income } from '@/types/income';
import { Category } from '@/types/category';

const DB_URL = 'https://react-daily-expense-app-default-rtdb.asia-southeast1.firebasedatabase.app'; // Or default-rtdb.firebaseio.com. Let's use the standard one. Wait, in another project it was asian-southeast1, but usually it's just .firebaseio.com if not specified. I'll use firebaseio.com. Wait, I should probably check if we can just use the client SDK first and fallback if it fails.

// Let's use the client SDK with a fallback.
import { ref, get, push, set, remove } from 'firebase/database';
import { db } from '@/config/firebase';

const USER_ID = "dummy_user_id"; // TODO: get from Auth
const FALLBACK_DB_URL = 'https://react-daily-expense-app-default-rtdb.firebaseio.com';

// Expenses
export async function fetchExpenses(): Promise<Expense[]> {
  try {
    const snapshot = await get(ref(db, `expense${USER_ID}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  } catch (err) {
    console.warn("Client SDK failed, falling back to REST API", err);
    const res = await fetch(`${FALLBACK_DB_URL}/expense${USER_ID}.json`, { cache: 'no-store' });
    const data = await res.json();
    if (data) {
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  }
}

export async function addExpense(expense: Omit<Expense, 'id'>) {
  try {
    const listRef = ref(db, `expense${USER_ID}`);
    const newRef = push(listRef);
    await set(newRef, expense);
  } catch (err) {
    console.warn("Client SDK failed, falling back to REST API", err);
    await fetch(`${FALLBACK_DB_URL}/expense${USER_ID}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    });
  }
}

export async function deleteExpense(id: string) {
  try {
    await remove(ref(db, `expense${USER_ID}/${id}`));
  } catch (err) {
    console.warn("Client SDK failed, falling back to REST API", err);
    await fetch(`${FALLBACK_DB_URL}/expense${USER_ID}/${id}.json`, {
      method: 'DELETE'
    });
  }
}

// Incomes
export async function fetchIncomes(): Promise<Income[]> {
  try {
    const snapshot = await get(ref(db, `income${USER_ID}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  } catch (err) {
    const res = await fetch(`${FALLBACK_DB_URL}/income${USER_ID}.json`, { cache: 'no-store' });
    const data = await res.json();
    if (data) {
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  }
}

export async function addIncome(income: Omit<Income, 'id'>) {
  try {
    const listRef = ref(db, `income${USER_ID}`);
    const newRef = push(listRef);
    await set(newRef, income);
  } catch (err) {
    await fetch(`${FALLBACK_DB_URL}/income${USER_ID}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(income)
    });
  }
}

export async function deleteIncome(id: string) {
  try {
    await remove(ref(db, `income${USER_ID}/${id}`));
  } catch (err) {
    await fetch(`${FALLBACK_DB_URL}/income${USER_ID}/${id}.json`, { method: 'DELETE' });
  }
}

// Categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const snapshot = await get(ref(db, `category${USER_ID}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  } catch (err) {
    const res = await fetch(`${FALLBACK_DB_URL}/category${USER_ID}.json`, { cache: 'no-store' });
    const data = await res.json();
    if (data) {
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    }
    return [];
  }
}

export async function addCategory(category: Omit<Category, 'id'>) {
  try {
    const listRef = ref(db, `category${USER_ID}`);
    const newRef = push(listRef);
    await set(newRef, category);
  } catch (err) {
    await fetch(`${FALLBACK_DB_URL}/category${USER_ID}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
  }
}

export async function deleteCategory(id: string) {
  try {
    await remove(ref(db, `category${USER_ID}/${id}`));
  } catch (err) {
    await fetch(`${FALLBACK_DB_URL}/category${USER_ID}/${id}.json`, { method: 'DELETE' });
  }
}
