import type { Profile } from '@emerald-dao/component-library/components/UserProfileLabel/profile.interface';
import type { User } from '@emerald-dao/component-library/models/user.interface';
import { writable } from 'svelte/store';

/*
  This store is used to keep track of the current connected user.
*/

export const user = writable<User | null>(null);
export const profile = writable<Profile | null>(null);
