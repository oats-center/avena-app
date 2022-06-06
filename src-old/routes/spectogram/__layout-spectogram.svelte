<script>
    import Title from '$lib/title.svelte'
    import Footer from '$lib/footer.svelte'
    import '../../app.css'
</script>
<!-- <header>
    <Title></Title>
</header> -->
<main>
    <slot></slot>
</main>
<!-- <footer>
    <Footer></Footer>
</footer> -->

<style>
    header {
        text-align: center;
    }
    main {
        /* display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px auto; */

        display: flex;
        flex: 1;
        align-items: left;
		flex-direction: column;
		width: 100%;
		margin: 50 auto;
		box-sizing: border-box;
    }
    footer {
        display:flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
    }
  </style>