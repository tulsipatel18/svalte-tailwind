<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Cart from './Cart.svelte';
  
  import Main from './main.svelte';
  
  
</script>

<Router>
 
  <Route path="/" component={Main} />
  <Route path="/cart" component={Cart} />
</Router>
