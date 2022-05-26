<script>
    import { each } from 'svelte/internal';
    import { onMount } from 'svelte';
    import '../app.css';
    import Toggle from './Toggle.svelte'
    let value = '';
    let name = 'Input data here';
    /**
* @type {boolean | undefined}
*/
    let isRadio;
    let time = new Date();

    $: hours = time.getHours();
    $: minutes = time.getMinutes();
    $: seconds = time.getSeconds();
    $: milliseconds = time.getTime();


    onMount(() => {
      const interval = setInterval(() => {
        time = new Date();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
  	});

    let data = [
   {
      "name":"systemd-fsck@dev-disk-by\\x2duuid-f967d22b\\x2d6bdc\\x2d4a3c\\x2d82c7\\x2dcd95531d7503.service",
      "description":"File System Check on /dev/disk/by-uuid/f967d22b-6bdc-4a3c-82c7-cd95531d7503",
      "load_state":"loaded",
      "active_state":"active",
      "sub_state":"exited",
      "followed_by":"",
      "service_type":"oneshot",
      "status":"",
      "start_time":1652227201621097,
      "exit_time":1652227201678553,
      "pid":1197,
      "memory_accounting":true,
      "memory_current":18446744073709551615,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":34619000
   },
   {
      "name":"wg-quick@wgAvena.service",
      "description":"WireGuard via wg-quick(8) for wgAvena",
      "load_state":"loaded",
      "active_state":"failed",
      "sub_state":"failed",
      "followed_by":"",
      "service_type":"oneshot",
      "status":"",
      "start_time":1652286149036353,
      "exit_time":1652286149154830,
      "pid":57639,
      "memory_accounting":true,
      "memory_current":18446744073709551615,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":53775000
   },
   {
      "name":"gssproxy.service",
      "description":"GSSAPI Proxy Daemon",
      "load_state":"loaded",
      "active_state":"active",
      "sub_state":"running",
      "followed_by":"",
      "service_type":"forking",
      "status":"",
      "start_time":1652227208244736,
      "exit_time":0,
      "pid":1416,
      "memory_accounting":true,
      "memory_current":1032192,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":535587000
   },
   {
      "name":"systemd-zram-setup@zram0.service",
      "description":"Create swap on /dev/zram0",
      "load_state":"loaded",
      "active_state":"active",
      "sub_state":"exited",
      "followed_by":"",
      "service_type":"oneshot",
      "status":"",
      "start_time":1652227200752611,
      "exit_time":1652227200770220,
      "pid":1118,
      "memory_accounting":true,
      "memory_current":18446744073709551615,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":15468000
   },
   {
      "name":"abrt-xorg.service",
      "description":"ABRT Xorg log watcher",
      "load_state":"loaded",
      "active_state":"active",
      "sub_state":"running",
      "followed_by":"",
      "service_type":"simple",
      "status":"",
      "start_time":1652227207346305,
      "exit_time":0,
      "pid":1376,
      "memory_accounting":true,
      "memory_current":2297856,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":4315524000
   },
   {
      "name":"abrtd.service",
      "description":"ABRT Automated Bug Reporting Tool",
      "load_state":"loaded",
      "active_state":"active",
      "sub_state":"running",
      "followed_by":"",
      "service_type":"dbus",
      "status":"",
      "start_time":1652227207320534,
      "exit_time":0,
      "pid":1362,
      "memory_accounting":true,
      "memory_current":72404992,
      "memory_available":18446744073709551615,
      "cpu_accounting":true,
      "cpu_shares":18446744073709551615,
      "cpu_usage_n_sec":1777520000
   }];


  //  function getHour(){
    
  //   return Math.round(milliseconds - service.start_time/1000)/1000/3600%24;

  //  }

    console.log("Hello world")
    console.log(data);
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
    <div class="tiledBackground">
    </div>
    
    <div class="divider w-full"></div>

      <div class="space-y-28 mt-30 h-96 mockup-window border border-base-300 break-before-avoid mb-16">
        <div class="flex justify-center px-4 py-16 border-t border-base-300">Main Dashboard</div>
      </div>      

    <div class="divider w-full"></div>

      <!-- <div class="grid grid-cols-4 gap-4 mb-16"> -->
      
      <div class="grid grid-cols-3 gap-2 mb-16">
        {#each data as service}
        {@const Hour = Math.round((milliseconds - service.start_time/1000)/1000/3600%24)}
        {@const Min = Math.round((milliseconds - service.start_time/1000)/1000/60%60)}
        {@const Sec = Math.round((milliseconds - service.start_time/1000)/1000%60)}
          <div class="stats shadow max-w-fit">
            
            <div class="stat w-96 break-words">
              <!-- <div class="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div> -->
              <div class="stat-title">Service Type</div>
              <div class="stat-value text-primary text-base truncate">{service.name}</div>
              <!-- <div class="stat-desc">21% more than last month</div> -->
            </div>
            
            <div class="stat w-64">
              <!-- <div class="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div> -->
              <div class="stat-title">Run Time</div>
              
              <div class="stat-value text-secondary">{Hour}:{Min}:{Sec}</div>
              <!-- <div class="stat-desc">21% more than last month</div> -->
            </div>

            <div class="stat w-64">
              <div class="stat-value">{(service.memory_current/service.memory_available*100).toFixed(2)}%</div>
              <div class="stat-title">Memory Utilization</div>
              <!-- <div class="stat-desc text-secondary">31 tasks remaining</div> -->
            </div>
            
            <div class="stat w-64">
              <!-- <div class="stat-figure text-secondary">
                <div class="avatar online">
                  <div class="w-16 rounded-full">
                    <img src="https://api.lorem.space/image/face?w=128&h=128" />
                  </div>
                </div>
              </div> -->
              <div class="stat-value">{(service.cpu_usage_n_sec/service.cpu_shares*100).toFixed(2)}%</div>
              <div class="stat-title">CPU Utilization</div>
              <!-- <div class="stat-desc text-secondary">31 tasks remaining</div> -->
            </div>
            <div class="btn-group h-10">
          
              <Toggle bind:checked={isRadio} let:checked={checked}>
                  <button class="w-48 h-fit btn btn-active"> {checked ? 'Start' : 'Stop'}</button>
              </Toggle>
              <button type="submit" class="w-48 h-fit btn btn-active">Reset</button>
             </div>   
            
          </div>
           
        {/each}

        
        </div>

      </div>
        <!-- <div class="form-control max-w-xs">
        <label class="label">
          <span class="label-text">Parameter 1</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        <select class="select select-bordered max-w-xs">
          <option disabled selected>Unit 1</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        </div>
        <div class="form-control max-w-xs">
          <label class="label">
            <span class="label-text">Parameter 2</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          <select class="select select-bordered max-w-xs">
            <option disabled selected>Unit 2</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div class="form-control max-w-xs">
          <label class="label">
            <span class="label-text">Parameter 3</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          <select class="select select-bordered max-w-xs">
            <option disabled selected>Unit 3</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div class="form-control max-w-xs pb-16">
          <label class="label">
            <span class="label-text">Parameter 4</span>
          </label>
          <input type="range" min="0" max="100" value="40" class="range range-primary" />
        </div>        
        <div class="btn-group h-10">
          <Toggle bind:checked={isRadio} let:checked={checked}>
              <button class="w-48 h-fit btn btn-active"> {checked ? 'Start' : 'Stop'}</button>
          </Toggle>
          <button type="submit" class="w-48 h-fit btn btn-active">Reset</button>
         </div>    
        </div>
         <div class="space-y-28 mt-30 mockup-window border border-base-300 break-before-avoid">
          <div class="flex justify-center px-4 py-16 border-t border-base-300">Screen</div>
        </div>      
      </div> -->


        <!-- <input type="text" placeholder="Data Input" class="input input-bordered input-lg w-fit max-w-full" /> -->
        <!-- <textarea class="textarea textarea-primary max-w-full w-6/12" placeholder="Data Input"></textarea> -->


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

