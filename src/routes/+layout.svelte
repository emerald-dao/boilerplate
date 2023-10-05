<script type="ts">
	import '@emerald-dao/design-system/build/variables-dark.css';
	import '@emerald-dao/design-system/build/variables-light.css';
	import '@emerald-dao/design-system/build/variables.css';
	import '@emerald-dao/component-library/styles/app.scss';
	import '../app.postcss';
	import getFindProfile from '../flow/utils/getFindProfile';
	import { navElements, emeraldTools, socialMedia } from '$lib/config/navigation';
	import type { User } from '@emerald-dao/component-library/models/user.interface';
	import { theme } from '$stores/ThemeStore';
	import { profile, user } from '$stores/UserStore';
	import { network } from '$stores/NetworkStore';
	import { transactionInProgress } from '$stores/TransactionStore';
	import { logIn, unauthenticate } from '../flow/actions/authentication';
	import { Header, Footer } from '@emerald-dao/component-library';
	import { onMount } from 'svelte';

	onMount(() => {
		let html = document.querySelector('html');

		if (html) {
			html.setAttribute('data-theme', $theme);
		}
	});

	$: if ($user && $user.addr) {
		getFindProfile($user.addr).then((res) => {
			if (res) {
				profile.set({
					...res,
					address: ($user as User).addr,
					type: 'find'
				});
			} else {
				profile.set({
					address: ($user as User).addr,
					avatar: '/avatars/anon-avatar.png',
					name: 'Anonymus User',
					type: 'find'
				});
			}
		});
	} else {
		profile.set(null);
	}
</script>

<Header
	themeStore={theme}
	user={$user}
	profile={$profile}
	network={$network}
	transactionInProgress={$transactionInProgress}
	{logIn}
	{unauthenticate}
/>
<main>
	<slot />
</main>
<Footer {navElements} {emeraldTools} socials={socialMedia} />
