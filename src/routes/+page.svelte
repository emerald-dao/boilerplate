<script type="ts">
  import dappInfo from "$lib/config/config";
  import { Section, Container, Column } from "@mateoroldos/svelte.bones"
</script>

<Section>
  <Container>
    <Column>
      <h1>Welcome to <span>{dappInfo.title}</span></h1>
      <p>{dappInfo.description}</p>
      <p>Crafted by {dappInfo.author}</p>
      <a href="https://discord.com/invite/emeraldcity" target="blank" class="button">Join Discord</a>
    </Column>
  </Container>
</Section>

<style type="scss">
  h1, p {
    text-align: center;
  }

  span {
    color: var(--clr-primary-main)
  }
</style>