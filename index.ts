import Partie from "./Classes/Partie";

let partie: Partie = new Partie(3);
partie.initialiserPartie("Robin", "Nathan", "Alexandre");
partie.lancerPartie();
partie.afficherGagnant();
