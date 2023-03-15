
import { writable } from 'svelte/store';

// Load the stored value from localStorage if it exists
const storedValue = localStorage.getItem('cartContents');
const initialValue = storedValue ? JSON.parse(storedValue) : [];

const storedValue2 = localStorage.getItem('cartTotal');
const initialValue2 = storedValue2 ? JSON.parse(storedValue2) : 0;


// Create the writable store with the initial value
export const cartContents = writable(initialValue);


export const cartTotal=writable(initialValue2)
// Subscribe to changes in the myStore store, and update the localStorage value accordingly
cartContents.subscribe(value => {
  localStorage.setItem('cartContents', JSON.stringify(value));
});

cartTotal.subscribe(value => {
  localStorage.setItem('cartTotal', JSON.stringify(value));
});
