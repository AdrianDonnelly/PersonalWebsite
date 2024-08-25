<script>
    import { onMount } from 'svelte';
    onMount(() => {
      // @ts-ignore
      import('../../static/JsSrc/dist/src.js').then((module) => {
        module.default(); // Call the default export if your JS module has one
      });
    });
    import { Separator } from "$lib/components/ui/separator";
  </script>

<svelte:head>
    <title>Adrian Donnelly</title> 
</svelte:head>

<nav class="bg-black">
    <div class="text-white mt-4 ml-6 mr-6">
    <h1 class="scroll-m-20 text-2xl font-extrabold tracking-tight ">Adrian Donnelly</h1>
    <Separator class="my-4" />

    <div class="flex flex-row gap-3 text-muted-foreground ">
    <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a href="https://www.linkedin.com/in/adrdonnelly/">LinkedIn</a></h1>
    <Separator orientation="vertical" />

    <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a href="mailto:adrian.donnelly15@outlook.com">Email</a></h1>
    <Separator orientation="vertical" />

    <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a href="https://github.com/AdrianDonnelly">Github</a></h1>

</div>
</div>
  </nav>
  