
import { writable } from 'svelte/store';

// Load the stored value from localStorage if it exists
const storedValue = localStorage.getItem('cartContents');
const initialValue = storedValue ? JSON.parse(storedValue) : [];

// Create the writable store with the initial value
export const cartContents = writable(initialValue);

// Subscribe to changes in the myStore store, and update the localStorage value accordingly
cartContents.subscribe(value => {
  localStorage.setItem('cartContents', JSON.stringify(value));
});
