export default class De {
  private _max: number;

  public constructor(valeurMaxDe: number) {
    this._max = valeurMaxDe;
  }

  /**
   * Lance un dé de valeur _max : '_max' créé a l'instanciation du dé
   * @returns un nombre random entre 1 et la valeur _max du dé
   */
  public lancer(): number {
    return Math.floor(Math.random() * this._max);
  }
}
