let listeUsers = [];
let chargerUsers = () => {
    for(let no=1;no<100;no++){
       let user;
       user.push({'id':no,'nom':"name "+no});
       listeUsers.push(user);

    }
}

let chargerListesDeroulantes = () => {
    remplirSelDirectors();
    remplirSelRatios();
    remplirSelDurees();
    lister('A','');
}
let calculerTotal = () => {
    //Recupérer le select selTotal définit dans la page index.html.
    let selTotal = document.getElementById('selTotal');
    //Recupére l'option choisie. Voir commentaires dans listerCommandesSelonProduit
    let optionChoisie = selTotal.options[selTotal.selectedIndex].text;
    let total=0, montant,nbre=0;
    let affiche =``;

    //Parcour de toutes les commandes
    for(let unFilm of listeFilms){
            montant = unFilm.Runtime;
            montant=parseInt(montant.replace(' min',''));
            if (optionChoisie == 'Plus que 50' && montant > 50){
                    total+=montant;
                    nbre++;
                affiche +=`
                <tr>
                <td>${unFilm.Director}</td>
                <td class="col">${unFilm.Rated}</td>
                <td class="col">${unFilm.Runtime}</td>
               `;
            } else if(optionChoisie == 'Moins que 50' && montant <= 50){
                    total+=montant;
                    nbre++;
                    affiche +=`
                    <tr>
                    <td>${unFilm.Director}</td>
                    <td class="col">${unFilm.Rated}</td>
                    <td class="col">${unFilm.Runtime}</td>
                   `;
                }else if(optionChoisie == 'N/A' && unFilm.Runtime =='N/A' ){
                        nbre++;
                        affiche +=`
                        <tr>
                        <td>${unFilm.Director}</td>
                        <td class="col">${unFilm.Rated}</td>
                        <td class="col">${unFilm.Runtime}</td>
                       `;
                    
            }else if(optionChoisie == 'Tous' && unFilm.Runtime !='N/A' ){
                total+=montant;
                nbre++;
                affiche +=`
                <tr>
                <td>${unFilm.Director}</td>
                <td class="col">${unFilm.Rated}</td>
                <td class="col">${unFilm.Runtime}</td>
               `;
    
            }
    //Mettre le total avec 2 décilames suivi de $.
    let rep = nbre + " films de Total de "+total+" min";

    rep = listerEntete('A',rep);
    rep += affiche;
    rep+=`</tr></tbody></table>`;
    document.getElementById('contenu').innerHTML = rep;
    }
}

let listerCommandesSelonDirector = () => {
    //Prendre le select de la page index.html qu'a comme id selDirectors
    let selDirectors = document.getElementById('selDirectors');
    let DirectorChoisi = selDirectors.options[selDirectors.selectedIndex].text;
    lister('D', DirectorChoisi);//P-Pour un Director donné
}
let listerFilmsSelonRatio = () =>{
    let selRatios = document.getElementById('selRatios');
    let ratioChoisi = selRatios.options[selRatios.selectedIndex].text;
    lister('R', ratioChoisi);//P-Pour un Ratio donné

}
let listerFilmsSelonDuree = () =>{
    let selDurees = document.getElementById('selDurees');
    let DureeChoisi = selDurees.options[selDurees.selectedIndex].text;
    lister('T', DureeChoisi);//P-Pour un Duree donné

}

let remplirSelDirectors = () => {
    //Recupérer le select de la page index.html qui a comme id selDirectors
    let selDirectors = document.getElementById('selDirectors');
    let tmpDirectors = []; //Tableau pour y placer le nom des Directors sans doublons
    //Enlever les doublons
    for(let unFilm of listeFilms){//Parcour de la liste de toutes les commandes du fichier Directors.js
        //Si le Director n'est pas (-1) dans le tableau tmpDirectors alors le placer dans tmpDirectors
        // sinon on ne le place pas et ainsi ont evite les doublons.
        if(tmpDirectors.indexOf(unFilm.Director) == -1){
            tmpDirectors.push(unFilm.Director)
        }
    }
    //Créer les options du select à partir du tableau tmpDirectors
    //que lui n'a pas de doublons.
    for(let nomDirector of tmpDirectors){
        selDirectors.options[selDirectors.options.length] = new Option(nomDirector);
    }
}

//Permet de remplir le select de id selAnnees
//avec le nom de tous les Annees mais sans doublons (répétitions)
//Mêmes commentaires que remplirSelDirectors()
let remplirSelRatios = () => {
    let selRatios = document.getElementById('selRatios');
    let tmpRatios = [];
    //Enlever les doublons
    for(let unFilm of listeFilms){
        //Si le Annee n'est pas (-1) dans le tableau tmpAnnees
        if(tmpRatios.indexOf(unFilm.Rated) == -1){
            tmpRatios.push(unFilm.Rated)
        }
    }
    //Créer les options du select à partir du tableau tmpAnnees
    //que lui n'a pas de doublons.
    for(let nomRatio of tmpRatios){
        selRatios.options[selRatios.options.length] = new Option(nomRatio);
    }
}

let remplirSelDurees = () => {
    let selDurees = document.getElementById('selDurees');
    let tmpDurees = [];
    //Enlever les doublons
    for(let unFilm of listeFilms){
        //Si le Duree n'est pas (-1) dans le tableau tmpDurees
        if(tmpDurees.indexOf(unFilm.Runtime) == -1){
            tmpDurees.push(unFilm.Runtime)
        }
    }
    //Créer les options du select à partir du tableau tmpDurees
    //que lui n'a pas de doublons.
    for(let nomDuree of tmpDurees){
        selDurees.options[selDurees.options.length] = new Option(nomDuree);
    }
}

let listerEntete = (pour, nomDePour) => {
    let rep = `
        <table border=1>
        `;
        if(pour=='D'){
            rep += `
                <caption>LISTE DU REALISATEUR ${nomDePour}</caption>
                <tr>
                <th>RATIO</th>
                <th>DUREE</th>
            `;
        } else if(pour=='R'){
            rep += `
                <caption>LISTE DES RATIOS ${nomDePour}</caption>
                <tr>
                <th>REALISATEUR</th>
                <th>DUREE</th>
            `;
        } else if(pour=='T'){
            rep += `
                <caption>LISTE DES DUREES ${nomDePour}</caption>
                <tr>
                <th>REALISATEUR</th>
                <th>RATIO</th>
            `;
        } else if(pour=='A' && nomDePour != ''){
            rep += `
                <caption>liste des ${nomDePour} (duree different de N/A)</caption>
                <tr>
                <th>REALISATEUR</th>
                <th>RATIO</th>
                <th>DUREE</th>
            `;
        }else {//Tout la liste
                rep += `
                <caption>LISTE DE TOUTES LES FILMS</caption>
                <tr>
                <th>REALISATEUR</th>
                <th>RATIO</th>
                <th>DUREE</th>
                `;
        }
        rep +=`</tr>`;
        return rep;
}
let lister = (pour, nomDePour) => {//pour est soit P ou C ou T-pour toute la liste
    let rep = listerEntete(pour, nomDePour);//nomDePour est soit le nom du Director ou le nom du client
    rep+=`<tbody>`;
    for(let unFilm of listeFilms){
        //Ont ramasse dans rep2 la valeur retournée par la fonction et si elle est différente
        //de vide alors ont va la mettre dans rep pour l'affichage et ont 
        //va créer les 4 autres colonnes. 
            if(pour=='D' && nomDePour == unFilm.Director){
                rep+= `
                     <tr>
                     <td class="col">${unFilm.Rated}</td>
                     <td class="col">${unFilm.Runtime}</td>
                         `;
             } else if(pour=='R' && nomDePour == unFilm.Rated){
                 rep+= `
                     <tr>
                     <td class="col">${unFilm.Director}</td>
                     <td class="col">${unFilm.Runtime}</td>
                         `;
             } else if(pour=='T' && nomDePour == unFilm.Runtime){
                 rep+= `
                     <tr>
                     <td class="col">${unFilm.Director}</td>
                     <td class="col">${unFilm.Rated}</td>
                     `;
             } else if (pour=='A'){
                 rep+= `
                 <tr>
                 <td>${unFilm.Director}</td>
                 <td class="col">${unFilm.Rated}</td>
                 <td class="col">${unFilm.Runtime}</td>
             `;
             }
    }
    rep+=`</tr></tbody></table>`;
    //Quand ont à fini de passer à travers tout les objets du tableau listeCommandes
    //nous allons prendre le résultat qu'est dans rep et le mettre comme contenu innerHTML de
    //l'élément de notre page qu'a comme id contenu et ainsi le résultat va apparaître.
    document.getElementById('contenu').innerHTML = rep;
}

