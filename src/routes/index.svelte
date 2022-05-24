<script>
    import '../app.css';
    import Toggle from './Toggle.svelte'
    let value = '';
    let name = 'Input data here';
    /**
* @type {boolean | undefined}
*/
    let isRadio;

    console.log("Hello world")
</script>


<!-- <div class="bg-fixed ..." style="background-image: url("tiledBackground")"> -->


  <nav>
      
      <!-- <a href="/">Home</a> -->

      <!-- <div class="navbar bg-base-100"> -->
      <!-- <h1 class="text-3xl font-bold text-center text-gray-800">ISOBlue Demo</h1> -->
      
        
  </nav>
  <div class="navbar bg-base-100">
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
    <div class="flex-1">
      <a href="/" class="tab tab-bordered">Home</a> 
        <a href="/spectogram.svelte" class="tab tab-bordered tab-active">Spectogram</a> 
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
      </button>
    </div>
    
  </div>

  <!-- <div class="absolute top-5 right-10">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered" />
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div> -->
  


<!-- <svelte:head>
    <title> Svelte Kit</title>
</svelte:head> -->

<main>
    <div class="tiledBackground center">
    </div>
    
    <div class="divider w-full"></div>


    <div class="flex flex"> 
        
        <!-- <input type="text" placeholder="Data Input" class="input input-bordered input-lg w-fit max-w-full" /> -->
        <textarea class="textarea textarea-primary max-w-full w-6/12" placeholder="Data Input"></textarea>
  
        <div class="btn-group h-10">
            <button type="submit" class="w-48 h-fit btn btn-active">Submit</button>
            <Toggle bind:checked={isRadio} let:checked={checked}>
                <button class="w-48 h-fit btn btn-active"> {checked ? 'Start' : 'Stop'}</button>
            </Toggle>
            <button type="submit" class="w-48 h-fit btn btn-active">Reset</button>
        </div>


        
        
    </div>

    <div class="mockup-window border border-base-300">
      <div class="flex justify-center px-4 py-16 border-t border-base-300">Screen</div>
    </div>

    

    <footer class="footer p-10 bg-base-200 text-base-content">



      <div>
        <img src="https://iot4ag.us/wp-content/uploads/2021/03/IoT4Ag-white-logo.png" width="200"/>
       
        <p>The Internet of Things for Precision Agriculture <br>
          an NSF Engineering Research Center</p>

        <p>Purdue University</p>
      </div> 
      <div class="grid grid-flow-col gap-4">
        <a class="link link-hover">About us</a> 
        <a class="link link-hover">Contact</a> 
        <div class="grid grid-flow-col gap-4">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
        </div>        
      </div> 
      
      <!-- <div>
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div> -->
    </footer>
</main>





<!-- <input value={name}> -->

