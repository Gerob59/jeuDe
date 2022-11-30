import Gobelet from "./Gobelet";
export default class Joueur {
  private _nom: string;
  private _score: number;

  constructor(nom: string) {
    this._nom = nom;
    this._score = 0;
  }

  get nom(): string {
    return this._nom;
  }

  /**
   * Permet d'afficher le score du joueur
   * @returns score du joueur
   */
  afficherScore(): number {
    return this._score;
  }

  /**
   * Le joueur joue son tour et lance les dés
   * @param gobelet gobelet avec tous les dés a l'inteieur
   * @returns score du joueur pour le tour
   */
  public jouer(gobelet: Gobelet): number {
    let resultat: number = gobelet.lancer();
    this._score += resultat;
    return resultat;
  }
}
