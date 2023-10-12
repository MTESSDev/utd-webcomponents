<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const paramsChamp1 = obtenirParametresPosteCanada('AAAA');
        const ctrlPosteCanada1 = new pca.Address(paramsChamp1.champs, paramsChamp1.options);    

        const paramsChamp2 = obtenirParametresPosteCanada('BBBB');
        const ctrlPosteCanada2 = new pca.Address(paramsChamp2.champs, paramsChamp2.options);    
    })

    
    function obtenirParametresPosteCanada(idControleAdresse) {
        
        const champs = [{
                element: `AdresseLigne1_${idControleAdresse}`,
                field: "Line1",
                mode: pca.fieldMode.DEFAULT
            }, {
                element: `AdresseLigne2_${idControleAdresse}`,
                field: "Line2",
                mode: pca.fieldMode.POPULATE
            }, {
                element: `Ville_${idControleAdresse}`,
                field: "City",
                mode: pca.fieldMode.POPULATE
            }, {
                element: `Province_${idControleAdresse}`,
                field: "ProvinceName",
                mode: pca.fieldMode.POPULATE
            }, {
                element: `Pays_${idControleAdresse}`,
                field: "CountryName",
                mode: pca.fieldMode.COUNTRY
            }, {
                element: `CodePostal_${idControleAdresse}`,
                field: "PostalCode",
                mode: pca.fieldMode.POPULATE
            }];

        const options = {
                key: "XA73-JP73-YJ98-CB75",
                name: `pc_${idControleAdresse}`,
                suppressAutocomplete: true,
                setCountryByIP: false,
                culture: "fr-ca",
                languagePreference: "fra"

        };

        return {champs: champs, options: options};
    }

/*
EcouteurSurAdresseEtPays: function() {
        var n = {
            attributes: !0,
            childList: !1
        }
          , t = function(n) {
            $(n).each(function(n, t) {
                t.attributeName == "aria-activedescendant" && $("input[id*='AdresseLigne1']").attr("aria-activedescendant", $("div[id='PosteCanada_results']").attr("aria-activedescendant"))
            })
        }
          , r = Commun.CreerObservateur("PosteCanada_results", n, t)
          , i = function(n) {
            $(n).each(function(n, t) {
                t.attributeName == "aria-activedescendant" && $("input[id*='Pays']").attr("aria-activedescendant", $("div[id='PosteCanada_countries']").attr("aria-activedescendant"))
            })
        }
          , u = Commun.CreerObservateur("PosteCanada_countries", n, i)
    },
    initialiser: function() {
        var t = [{
            element: "AdresseLigne1",
            field: "Line1",
            mode: pca.fieldMode.DEFAULT
        }, {
            element: "AdresseLigne2",
            field: "Line2",
            mode: pca.fieldMode.POPULATE
        }, {
            element: "Ville",
            field: "City",
            mode: pca.fieldMode.POPULATE
        }, {
            element: "Province",
            field: "ProvinceCode",
            mode: pca.fieldMode.POPULATE
        }, {
            element: "Pays",
            field: "CountryName",
            mode: pca.fieldMode.COUNTRY
        }, {
            element: "CodePostal",
            field: "PostalCode",
            mode: pca.fieldMode.POPULATE
        }]
          , i = {
            key: Constantes.CLE_POSTE_CANADA,
            name: "PosteCanada"
        }
          , n = new pca.Address(t,i);
        n.listen("search", function() {
            $("input[id*='AdresseLigne1']").attr("aria-expanded", "true").attr("aria-activedescendant", $("div[id*='PosteCanada_results'] div[class*='pcaselected']").attr("id")).attr("aria-selected", "true")
        });
        n.listen("search", function() {
            $("input[id*='Pays']").attr("aria-expanded", "true").attr("aria-activedescendant", $("div[id='PosteCanada_countries'] div[class*='pcaselected']").attr("id")).attr("aria-selected", "true")
        });
        n.listen("populate", function() {
            $("input[id*='AdresseLigne1']").attr("aria-expanded", "false").attr("aria-activedescendant", "").attr("aria-selected", "false").attr("aria-describedby", "");
            $(".populate-invalid").valid()
        });
        n.listen("country", function() {
            $("input[id*='Pays']").valid();
            $("input[id*='Pays']").attr("aria-expanded", "true").attr("aria-activedescendant", "").attr("aria-selected", "true")
        });
        pca.ready(PosteCanada.EcouteurSurAdresseEtPays())
    }*/    
</script>
<h1>Essais Poste Canada</h1>

<utd-menu-ancres selecteur="#main h2">
</utd-menu-ancres>

<h2>Adresse 1</h2>
<div class="utd-form-group">
    <label for="AdresseLigne1_AAAA">Adresse (ligne 1)&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input aria-describedby="inputAdresseInfo" class="utd-form-control" autocomplete="address-line1"  type="text"  id="AdresseLigne1_AAAA"/>
    <span class="field-validation-valid"></span>
    <span class="sr-only" id="inputAdresseInfo">Ce champ contient une liste d&#xE9;roulante, commencez &#xE0; saisir votre adresse et s&#xE9;lectionnez la proposition correspondante pour remplir les champs de la section adresse ci-dessous automatiquement.</span>
</div>

<div class="utd-form-group">
    <label for="AdresseLigne2_AAAA">Adresse (ligne 2)</label>
    <input class="utd-form-control" autocomplete="address-line2" type="text" id="AdresseLigne2_AAAA" value="" />
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Ville_AAAA">Ville, village ou municipalit&#xE9;&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input class="utd-form-control" type="text" id="Ville_AAAA" />
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Province_AAAA">Province, territoire ou &#xC9;tat</label>
    <input class="utd-form-control" type="text" id="Province_AAAA"/>
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Pays_AAAA">Pays&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input class="utd-form-control" autocomplete="country-name" type="text"  id="Pays_AAAA" />
    <span class="field-validation-valid"></span>
</div>
<div class="utd-form-group">
    <label for="CodePostal_AAAA">Code postal</label>
    <input class="utd-form-control" autocomplete="postal-code" type="text" id="CodePostal_AAAA"/>
    <span class="field-validation-valid"></span>
</div>


<h2>Adresse 2</h2>
<div class="utd-form-group">
    <label for="AdresseLigne1_BBBB">Adresse (ligne 1)&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input aria-describedby="inputAdresseInfo" class="utd-form-control" autocomplete="address-line1"  type="text"  id="AdresseLigne1_BBBB"/>
    <span class="field-validation-valid"></span>
    <span class="sr-only" id="inputAdresseInfo">Ce champ contient une liste d&#xE9;roulante, commencez &#xE0; saisir votre adresse et s&#xE9;lectionnez la proposition correspondante pour remplir les champs de la section adresse ci-dessous automatiquement.</span>
</div>

<div class="utd-form-group">
    <label for="AdresseLigne2_BBBB">Adresse (ligne 2)</label>
    <input class="utd-form-control" autocomplete="address-line2" type="text" id="AdresseLigne2_BBBB" value="" />
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Ville_BBBB">Ville, village ou municipalit&#xE9;&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input class="utd-form-control" type="text" id="Ville_BBBB" />
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Province_BBBB">Province, territoire ou &#xC9;tat</label>
    <input class="utd-form-control" type="text" id="Province_BBBB"/>
    <span class="field-validation-valid"></span>
</div>

<div class="utd-form-group">
    <label for="Pays_BBBB">Pays&nbsp;<span class="sr-only">Champ obligatoire</span></label>
    <input class="utd-form-control" autocomplete="country-name" type="text"  id="Pays_BBBB" />
    <span class="field-validation-valid"></span>
</div>
<div class="utd-form-group">
    <label for="CodePostal_BBBB">Code postal</label>
    <input class="utd-form-control" autocomplete="postal-code" type="text" id="CodePostal_BBBB"/>
    <span class="field-validation-valid"></span>
</div>



<style>
</style>