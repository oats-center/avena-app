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
      <div class="flex flex-row">
          <div class="basis-1/8">
              <a href="/" class="tab tab-bordered">Home</a> 
              <a href="/spectogram.svelte" class="tab tab-bordered tab-active">Spectogram</a> 
          </div>
          <!-- <div class="flex-none gap-2">
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
          </div>
        </div> -->
        
  </nav>
  


<!-- <svelte:head>
    <title> Svelte Kit</title>
</svelte:head> -->

<main>
    <div class="tiledBackground">
    </div>
    
    <!-- <div class="artboard artboard-horizontal phone-4">812×375</div> -->
    
    <div class="flex flex"> 
        
        <input type="text" name="todo" placeholder="Data input"
        class="w-full apperance-none shadow-sm border border-gray-200 
        p-2 focus:outline-none focus:border-gray-500 rounded-lg"/>
        <div class="btn-group">
            <button type="submit" class="w-full btn btn-active">Submit</button>
            <Toggle bind:checked={isRadio} let:checked={checked}>
                <button class="w-full btn btn-active"> {checked ? 'Start' : 'Stop'}</button>
            </Toggle>
        </div>


        <!-- <button type="submit" class="apperance-none shadow-sm border 
        border-gray-200 p-2 focus:outline-none focus:border-gray-500
        rounded-lg">Submit</button> -->
        <!-- <Toggle bind:checked={isRadio} let:checked={checked}>
            <button class="apperance-none shadow-sm border 
            border-gray-200 p-2 focus:outline-none focus:border-gray-500
            rounded-lg">
                {checked ? 'Start' : 'Stop'}
            </button>
        </Toggle> -->

        
        
    </div>

    <!-- <div class="margins">
        <Textfield textarea bind:value label="Label" class="apperance-none shadow-sm border border-gray-200 
        p-2 focus:outline-none focus:border-gray-500 rounded-lg">
        </Textfield>
        <button type="submit" class="apperance-none shadow-sm border 
        border-gray-200 p-2 focus:outline-none focus:border-gray-500
        rounded-lg">Submit</button>
    </div> -->

</main>





<!-- <input value={name}> -->

