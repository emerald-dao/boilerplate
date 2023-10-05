import persistentWritable from '$lib/utilities/persistentWritable';

export const theme: ReturnType<typeof persistentWritable<'light' | 'dark'>> = persistentWritable(
	'theme',
	'dark'
);
