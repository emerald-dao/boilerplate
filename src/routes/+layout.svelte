<script type="ts">
	import '../app.postcss';
	import '$lib/styles/app.scss';
	import { Footer } from '@emerald-dao/component-library'
	import { navElements, emeraldTools, socialMedia } from '$lib/config/navigation';
</script>

<!-- <Header /> -->
<main>
	<slot />
</main>
<Footer navElements={navElements} emeraldTools={emeraldTools} socials={socialMedia}/>
