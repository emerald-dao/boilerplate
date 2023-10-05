import type { FlowNetwork } from '$lib/types/flow-network.type';
import { writable } from 'svelte/store';

export const network = writable<FlowNetwork>('testnet');
