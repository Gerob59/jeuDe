export default class De {
  private _max: number;
  private _valeur;

  public constructor(valeurMaxDe: number) {
    this._max = valeurMaxDe;
    this._valeur = 0;
  }

  /**
   * Lance un dé de valeur _max : '_max' créé a l'instanciation du dé
   * @returns un nombre random entre 1 et la valeur _max du dé
   */
  public lancer(): number {
    this._valeur = Math.floor(Math.random() * this._max);
    return this._valeur;
  }
}
