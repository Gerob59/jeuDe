import De from "./De";
export default class Gobelet {
  private _score: number;
  private _des: De[];

  constructor() {
    this._score = 0;
    this._des = [];
  }

  /**
   * Lance tous les dés du gobelet
   * @returns la somme des valeurs des dés du gobelet
   */
  public lancer(): number {
    this._score = 0;
    this._des.forEach((de) => {
      this._score += de.lancer();
    });
    return this._score;
  }

  /**
   * Ajoute un
   * @param nouveauDe nouveau dé à ajouter au gobelet
   */
  public ajouterDe(nouveauDe: De): void {
    this._des.push(nouveauDe);
  }

  /**
   * Affiche le score du gobelet du joueur
   * @returns le score du cumul des dés du gobelet
   */
  public afficherScore(): number {
    return this._score;
  }
}
