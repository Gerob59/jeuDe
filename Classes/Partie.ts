import De from "./De";
import Gobelet from "./Gobelet";
import Joueur from "./Joueur";
export default class Partie {
  private _nbToursRestant: number;
  private _joueurs: Joueur[];
  private _gobelet: Gobelet;
  private _maxDe: number;

  constructor(nbTours: number, maxDe: number) {
    this._nbToursRestant = nbTours;
    this._maxDe = maxDe;
    this._gobelet = new Gobelet();
    this._joueurs = [];
  }

  public initialiserPartie(...nomJoueurs: string[]): void {
    nomJoueurs.forEach((nom) => {
      this.initialiserJoueur(nom);
    });
    if (nomJoueurs.length % 2 === this._nbToursRestant % 2) {
      this._nbToursRestant++;
    }
  }

  private initialiserJoueur(nomJoueur: string): void {
    const joueur: Joueur = new Joueur(nomJoueur);
    this._joueurs.push(joueur);
    const de: De = new De(this._maxDe);
    this._gobelet.ajouterDe(de);
  }

  private estPlusgrandQue(
    resultatJoueur: number,
    plusGrandGobelet: number
  ): number {
    if (resultatJoueur > plusGrandGobelet) {
      return resultatJoueur;
    } else {
      return plusGrandGobelet;
    }
  }

  private aGagnerLaManche(valeurPlusGrandGobelet: number) {
    this._joueurs.forEach((joueur) => {
      if (joueur.scoreDeLaManche === valeurPlusGrandGobelet) {
        joueur.gagneLaManche();
      }
    });
  }

  public lancerPartie(): void {
    while (this._nbToursRestant > 0) {
      let plusGrandGobelet: number = 0;
      this._joueurs.forEach((joueur) => {
        let resultatJoueur: number = joueur.jouer(this._gobelet);
        plusGrandGobelet = this.estPlusgrandQue(
          resultatJoueur,
          plusGrandGobelet
        );
      });
      this.aGagnerLaManche(plusGrandGobelet);
      this._nbToursRestant--;
    }
  }

  public afficherGagnant(): void {
    let plusMancheGagne: number = this._joueurs[0].nbMancheGagne;
  }
}
