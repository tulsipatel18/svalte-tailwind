<script>
  import { Link } from 'svelte-routing';
  import CopyrightFooter from './components/CopyrightFooter.svelte';

  
  import {cartContents} from './store'

 
   
 $:console.log($cartContents);

 const handleclear=()=>{
  $cartContents=[]
 }


</script>



<div>
  <Link to='/'>home</Link>  
  <button on:click|preventDefault={()=>{handleclear()}}>clear cart</button>
</div>


<style>
  


    
</style>