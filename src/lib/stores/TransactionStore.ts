import { writable } from 'svelte/store';

/*
  This stores are used to keep track of current Flow Transactions and their status. 
  This is useful for displaying the TransactionModal for example
*/

export const transactionStatus = writable({});
export const transactionInProgress = writable(false);
