import '../config';
import * as fcl from '@onflow/fcl';
import { user } from '$lib/stores/UserStore';
import { browser } from '$app/environment';

if (browser) {
	// set Svelte $user store to currentUser,
	// so other components can access it
	fcl.currentUser.subscribe(user.set);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = () => fcl.logIn();
