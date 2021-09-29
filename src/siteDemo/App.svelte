<script>
    import {Route} from 'tinro'; 
    import Accueil from './pages/Accueil.svelte'; 
    import AideContextuelle from './pages/AideContextuelle.svelte'; 
    import Modal from './pages/Modal.svelte'; 
</script>
<div class="container">
    <nav>
        <a href="/">Accueil</a>
        <a href="/aidecontextuelle">Aide contextuelle</a>
        <a href="/modal">Modal</a>
    </nav>
    <main>
        <Route path="/"><Accueil /></Route>
        <Route path="/aidecontextuelle"><AideContextuelle /></Route>
        <Route path="Modal"><Modal /></Route>
    </main>
</div>

