import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

// Make any writable store persistent.
function persistentWritable<T>(key: string, defaultValue: T) {
	// Create a writable store.
	const { subscribe, set, update }: Writable<T> = writable();

	let storedValue: string | null = null;
	// Get stored value.
	if (browser) {
		storedValue = localStorage.getItem(key);
	}

	// Determine resolved value.
	const resolvedValue: T | null | string = storedValue === null ? defaultValue : storedValue;

	if (resolvedValue && isJsonString(resolvedValue)) {
		set(JSON.parse(resolvedValue as string));
	} else {
		set(resolvedValue as T);
	}

	// Subscribe to changes.
	subscribe((value) => {
		// Store the new value.
		if (browser) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return { subscribe, set, update };
}

function isJsonString<T>(str: T | string) {
	try {
		JSON.parse(str as string);
	} catch (e) {
		return false;
	}
	return true;
}

export default persistentWritable;
