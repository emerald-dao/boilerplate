<script type="ts">
	import '@emerald-dao/design-system/build/variables-dark.css';
	import '@emerald-dao/design-system/build/variables-light.css';
	import '@emerald-dao/design-system/build/variables.css';
	import '@emerald-dao/component-library/styles/app.scss';
	import '../app.postcss';
	import getFindProfile from '../lib/flow/utils/getFindProfile';
	import { navElements, emeraldTools, socialMedia } from '$lib/config/navigation';
	import type { User } from '@emerald-dao/component-library/models/user.interface';
	import { theme } from '$stores/ThemeStore';
	import { transaction } from '$stores/TransactionStore';
	import { profile, user } from '$stores/UserStore';
	import { network } from '$stores/NetworkStore';
	import { logIn, unauthenticate } from '../lib/flow/actions/authentication';
	import { Header, Footer, TransactionModal } from '@emerald-dao/component-library';
	import { onMount } from 'svelte';

	onMount(() => {
		let html = document.querySelector('html');

		if (html) {
			html.setAttribute('data-theme', $theme);
		}
	});

	// When a user is connected we set the profile store to save the profile data
	$: if ($user && $user.addr) {
		getFindProfile($user.addr).then((res) => {
			if (res) {
				profile.set({
					...res,
					address: ($user as User).addr as string,
					type: 'find'
				});
			} else {
				profile.set({
					address: ($user as User).addr as string,
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

<TransactionModal
	transactionInProgress={$transaction.progress}
	transactionStatus={$transaction.transaction}
	on:close={() => transaction.resetTransaction()}
/>
<Header
	themeStore={theme}
	user={$user}
	profile={$profile}
	network={$network}
	transactionInProgress={$transaction.progress}
	{logIn}
	{unauthenticate}
/>
<main>
	<slot />
</main>
<Footer {navElements} {emeraldTools} socials={socialMedia} />
