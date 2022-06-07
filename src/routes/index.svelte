<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script>
    import { each } from 'svelte/internal';
    import { onMount } from 'svelte';
    // import Spectogram from "./spectogram.svelte"
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
    let InactiveService = [
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
   }
    ];

    let ActiveService = [
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
   ];


   function EndService(){
      const service = ActiveService.shift();
      InactiveService.push(service);
      InactiveService = InactiveService;
      // ActiveService.pop();
      ActiveService = ActiveService;
      console.log("End Service");
   }

   function StartService(){
      const Iservice = InactiveService.shift();
      ActiveService.push(Iservice);
      ActiveService = ActiveService;
      // InactiveService.pop();
      InactiveService = InactiveService;      
      console.log("Start Service");
   }

  //  function IsRunning(){
      
  //     if (service.sub_state == "running"){        
  //       return true;
  //     }       
  //     else {
  //       return false;
  //       console.log (service.sub_state);
  //     }

  //  }


    console.log("Hello world")
    // console.log(data);
</script>


<main>
    
    <h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-2">Main Dashboard</h2>

      <div class="flex items-center mt-30 mb-16 h-96 border border-base-300 break-before-avoid">
        <!-- <div class="flex justify-center px-4 py-16 border-t border-base-300">Main Dashboard</div> -->
        <div class="radial-progress mt-30" style="--value:70; --size:16rem; --thickness: 2px;">CPU Utilization <br> 70%</div>
        <div class="radial-progress mt-30" style="--value:70; --size:16rem; --thickness: 2rem;">Memory Utilization <br> 80%</div>
      </div>      
    <h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-2">Active Services</h2>
    
    <div class="divider w-full"></div>
    

      <!-- <div class="grid grid-cols-4 gap-4 mb-16"> -->
      
      <div class="grid grid-cols-3 gap-2 mb-16">
        <div>
        {#each ActiveService as service}
        {@const Hour = Math.round((milliseconds - service.start_time/1000)/1000/3600%24)}
        {@const Min = Math.round((milliseconds - service.start_time/1000)/1000/60%60)}
        {@const Sec = Math.round((milliseconds - service.start_time/1000)/1000%60)}
        {@const MemoryShare = Math.round(service.memory_current/service.memory_available*100)%100}
        <!-- {checked = IsRunning} -->
        

        <!-- {#if MemoryShare == 100}
            {MemoryShare = 0};
          {/if} -->
          <div class="stats shadow max-w-fit item-center">
            
            <div class="stat w-80 break-words">
              <div class="stat-title">Service Type</div>
              <div class="stat-value text-primary text-base truncate">{service.name}</div>
            </div>
            
            <div class="stat w-64">
              <div class="stat-title">Run Time</div>
              
              <div class="stat-value">{Hour}:{Min}:{Sec}</div>
            </div>

            <div class="stat w-48">
              <div class="stat-value">{(MemoryShare).toFixed(2)}%</div>
              <div class="stat-title">Memory Usage</div>
            </div>
            
            <div class="stat w-48">
              <div class="stat-value">{(service.cpu_usage_n_sec/service.cpu_shares*100).toFixed(2)}%</div>
              <div class="stat-title">CPU Usage</div>
            </div>
            <div class="btn-group h-full">
            <button on:click={EndService} type="submit" class="w-full h-full btn btn-active" > End Service </button>
            </div>
            <!-- <div class="btn-group h-10">           -->
              <!-- <Toggle bind:checked={isRadio} let:checked={checked}>
                 <button class="w-48 h-fit btn btn-active"> {checked ? 'Start' : 'Pause'}</button>
              </Toggle> -->
             <!-- </div>    -->
            
          </div>
           
        {/each}

        </div>

	<!-- <div class="artboard artboard-horizontal phone-4">812×375</div> -->

      </div>


      <h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-2">Inactive Services</h2>
      
      <div class="divider w-full"></div>

      <div class="grid grid-cols-3 gap-2 mb-16">
        <div>
          {#each InactiveService as Iservice}
          {@const Hour = Math.round((milliseconds - Iservice.start_time/1000)/1000/3600%24)}
          {@const Min = Math.round((milliseconds - Iservice.start_time/1000)/1000/60%60)}
          {@const Sec = Math.round((milliseconds - Iservice.start_time/1000)/1000%60)}
          {@const MemoryShare = Math.round(Iservice.memory_current/Iservice.memory_available*100)%100}
          <!-- {checked = IsRunning} -->
          
  
          <!-- {#if MemoryShare == 100}
              {MemoryShare = 0};
            {/if} -->
            <div class="stats shadow max-w-fit">
              
              <div class="stat w-96 break-words">
                <!-- <div class="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div> -->
                <div class="stat-title">Service Type</div>
                <div class="stat-value text-primary text-base truncate">{Iservice.name}</div>
                <!-- <div class="stat-desc">21% more than last month</div> -->
              </div>
              
              <div class="stat w-64">
                <!-- <div class="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div> -->
                <div class="stat-title">State</div>
                
                <div class="stat-value">Inactive</div>
                <!-- <div class="stat-desc">21% more than last month</div> -->
              </div>
  
              <!-- <div class="stat w-64">
                <div class="stat-value">{(MemoryShare).toFixed(2)}%</div>
                <div class="stat-title">Memory Usage</div>
              </div> -->
              
              <div class="btn-group h-full">      
                <button on:click={StartService} type="submit" class="w-full h-full btn" > Start Service </button>
               </div>   
              
            </div>



          {/each}

        </div>
      </div>

</main>


