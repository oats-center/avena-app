<script>
	import Title from '$lib/title.svelte'
    import Footer from '$lib/footer.svelte'
    import "../app.css";
    // import Header from '$lib/header/Header.svelte';
  </script>



<!-- <Header /> -->

<header>
    <Title></Title>
</header>

<!-- 
<main>
	<slot />
</main> -->
 <div class="container mx-auto my-6 max-w-full">
      <slot></slot>
  </div>


  <footer>
    <Footer></Footer>
</footer>

  
<style>
	header {
        text-align: center;
    }
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
        height: 20%;
        max-width: 200px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>  \
