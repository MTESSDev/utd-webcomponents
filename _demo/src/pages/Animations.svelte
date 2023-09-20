<script>
    import { onMount } from 'svelte';
    import CodeSource from '../components/CodeSource.svelte'; 

    let mounted = false;

    onMount(() => {
        test1();
        test2();

        mounted = true;
    })


    function test1() {            
        setTimeout(() => {
            document.getElementById('zoneChargement1').classList.remove('utd-fond-element-chargement');
        }, 15000);
    }

    function test2() {
        document.getElementById('btnTest2').addEventListener('click', (event) => {
            const zoneChargement = document.getElementById('zoneChargement2');

            if(zoneChargement){
                if(zoneChargement.classList.contains('utd-fond-element-chargement')){
                    zoneChargement.classList.remove('utd-fond-element-chargement');
                    event.currentTarget.textContent = `Débuter l'animation`;
                } else {
                    zoneChargement.classList.add('utd-fond-element-chargement');
                    event.currentTarget.textContent = `Arrêter l'animation`;;
                }
            }
        })
    }

</script>

<h1>Animations</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Description</h2>
<p>Pour le moment une seule animation est disponible. Elle permet d'indiquer un contenu en cours de chargement.</p>

   
<h2>Zone en cours de chargement</h2>
<p>Cette animation affiche un fond gris "flashy" (change de teinte de gris en boucle) afin d'indiquer un contenu en cours de chargement.</p>
<p>Pour l'utiliser il suffit d'ajouter la classe <span class="utd-emphase-gris">utd-fond-element-chargement</span> sur un élément ex. une div. Pour arrêter l'animation il suffit de retirer la classe sur l'élément.</p>
<h3>Exemples</h3>
<h4>1- Zone avec chargement simulé de 15 secondes</h4>
<div id="conteneurZoneChargement1" class="mb-32">
    <div id="zoneChargement1" class="utd-fond-element-chargement" style="width: 250px; height: 250px; border: 1px solid var(--gris-clair);"></div>
</div>
{#if mounted}
    <CodeSource idElementCodeSource="conteneurZoneChargement1" titre="Code source (html)">
    </CodeSource>   

    <CodeSource codeSource="{test1.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   


<h4>2- Zone avec chargement arrêté via un bouton</h4>
<div id="conteneurZoneChargement2">
    <div id="zoneChargement2" style="width: 250px; height: 250px; border: 1px solid var(--gris-clair);"></div>
</div>    
<button type="button" id="btnTest2" class="utd-btn secondaire mt-16 mb-32">Débuter l'animation</button>
{#if mounted}
    <CodeSource idElementCodeSource="conteneurZoneChargement2" titre="Code source (html)">
    </CodeSource>   

    <CodeSource codeSource="{test2.toString()}" titre="Code source (js)" language="language-javascript">
    </CodeSource>   
{/if}   

