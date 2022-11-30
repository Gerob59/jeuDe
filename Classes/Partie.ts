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
  }
  private initialiserJoueur(nomJoueur: string): void {
    const joueur: Joueur = new Joueur(nomJoueur);
    this._joueurs.push(joueur);
    const de: De = new De(this._maxDe);
    this._gobelet.ajouterDe(de);
  }

  public lancerPartie(): void {}
  public afficherGagnant(): void {}
}
