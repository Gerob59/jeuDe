export default class De {
  private _valeur: number;

  public constructor(valeurMaxDe: number) {
    this._valeur = valeurMaxDe;
  }

  /**
   * Lance un dé de valeur max : '_valeur' créé a l'instanciation du dé
   * @returns un nombre random entre 1 et la valeur max du dé
   */
  public lancer(): number {
    return Math.floor(Math.random() * this._valeur);
  }
}
