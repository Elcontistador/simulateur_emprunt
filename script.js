// On sélectionne le curseur et l'endroit où afficher le texte
const curseurMontant = document.getElementById('rangeMontant');
const affichageMontant = document.getElementById('affichageMontant');
const curseurMois= document.getElementById('rangeMois');
const affichageMois = document.getElementById('affichageMois');

// Sélection du curseur Taux
const curseurTaux = document.getElementById('rangeTaux');
const affichageTaux = document.getElementById('affichageTaux');

// Sélection des éléments (Sorties / Résultats)
const affichageTotal = document.getElementById('montantTotal');
const affichageMensualite = document.getElementById('montantParMois');
const affichageInteret = document.getElementById('interetTotal');

// Constante : Taux fixe de 7%
const tauxAnnuel = 0.07;
    
// Fonction pour formater un nombre (ex: 10000 -> 10 000)
const formatNombre = (nombre) => {
    return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(nombre);
};

// La fonction principale de calcul
const calculerResultats = () => {
    // Récupération des valeurs actuelles
    const capital = parseFloat(curseurMontant.value);
    const mois = parseFloat(curseurMois.value);

    // On récupère le taux dynamique
    // On divise par 100 car 7% = 0.07 dans les maths
    const tauxPourcentage = parseFloat(curseurTaux.value);
    const tauxAnnuel = tauxPourcentage / 100;
    
    // Calcul des taux mensuels
    const tauxMensuel = tauxAnnuel / 12;
    
    // Formule mathématique des mensualités (M = P * [r(1+r)^n] / [(1+r)^n - 1])
    // P = capital, r = tauxMensuel, n = mois
    const mensualite = (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -mois));
    
    const coutTotal = mensualite * mois;
    const totalInterets = coutTotal - capital;

    // Mise à jour de l'affichage
    affichageMontant.innerText = formatNombre(capital);
    affichageMois.innerText = mois;
    affichageTaux.innerText = tauxPourcentage;
    
    affichageMensualite.innerText = formatNombre(mensualite);
    affichageTotal.innerText = formatNombre(coutTotal);
    affichageInteret.innerText = formatNombre(totalInterets);
};

// Écouteurs d'événements
curseurMontant.addEventListener('input', calculerResultats);
curseurMois.addEventListener('input', calculerResultats);
curseurTaux.addEventListener('input', calculerResultats);

// Calcul initial au chargement de la page
calculerResultats();