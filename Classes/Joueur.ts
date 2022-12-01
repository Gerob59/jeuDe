import Gobelet from "./Gobelet";
export default class Joueur {
  private _nom: string;
  private _scoreDeLaManche: number;
  private _nbMancheGagne: number;

  constructor(nom: string) {
    this._nom = nom;
    this._scoreDeLaManche = 0;
    this._nbMancheGagne = 0;
  }

  get nbMancheGagne(): number {
    return this._nbMancheGagne;
  }

  get nom(): string {
    return this._nom;
  }

  get scoreDeLaManche(): number {
    return this._scoreDeLaManche;
  }

  /**
   * Permet d'incrémenter le nombre de manche gagné du joueur
   */
  public gagneLaManche() {
    this._nbMancheGagne++;
  }

  /**
   * Permet d'afficher le score du joueur
   * @returns score du joueur
   */
  public afficherScore(): number {
    return this._scoreDeLaManche;
  }

  /**
   * Le joueur joue son tour et lance les dés
   * @param gobelet gobelet avec tous les dés a l'inteieur
   * @returns score du joueur pour le tour
   */
  public jouer(gobelet: Gobelet): number {
    let resultat: number = gobelet.lancer();
    this._scoreDeLaManche += resultat;
    return resultat;
  }
}
