import De from "./De";
export default class Gobelet {
  private _des: De[] = [];

  public get des() {
    return this._des;
  }

  /**
   * Lance tous les dés du gobelet
   * @returns la somme des valeurs des dés du gobelet
   */
  public lancer(): number {
    let resultat: number = 0;
    this.des.forEach((de) => {
      resultat += de.lancer();
    });
    return resultat;
  }

  /**
   * Ajoute un
   * @param nouveauDe nouveau dé à ajouter au gobelet
   */
  public ajouterDe(nouveauDe: De): void {
    this.des.push(nouveauDe);
  }
}
