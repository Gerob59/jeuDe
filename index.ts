import Partie from "./Classes/Partie";

for (let index = 0; index <= 10; index++) {
  let partie: Partie = new Partie(3);
  partie.initialiserPartie("Robin", "Nathan", "Alexandre");
  partie.lancerPartie();
  partie.afficherGagnant();
}
