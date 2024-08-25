<script>
    import { onMount } from 'svelte';
    let width;
    let height;
  
    onMount(() => {
      width = window.innerWidth;
      height = window.innerHeight;
  
      // Your three.js setup code that depends on `window`
      // @ts-ignore
      import('../../static/JsSrc/dist/src.js').then((module) => {
        module.default(); // Call the default export if your JS module has one
      });
    });
    import { Separator } from "$lib/components/ui/separator";
  </script>
  
  <style>
    @import '../../static/styles/global.css'; 
  </style>
  
  <nav class="bg-black">
    <div class="text-white m-2 ml-4">
    <h1 class="scroll-m-20 text-2xl font-extrabold tracking-tight ">Adrian Donnelly</h1>
    <Separator class="my-4" />

    <div class="flex flex-row gap-3">
    <h1 class="scroll-m-20 text-l font-semibold tracking-tight"><a href="https://linkedin.com">LinkedIn</a></h1>
    <Separator orientation="vertical" />

    <h1 class="scroll-m-20 text-l font-semibold tracking-tight"><a href="mailto:your.email@example.com">Email</a></h1>
    <Separator orientation="vertical" />

    <h1 class="scroll-m-20 text-l font-semibold tracking-tight"><a href="https://github.com/your-profile">Github</a></h1>
    <Separator orientation="vertical" />
    
    <h1 class="scroll-m-20 text-l font-semibold tracking-tight"><a href="https://your-portfolio.com">Portfolio</a></h1>
</div>
</div>
  </nav>
  