import De from "./De";
import Gobelet from "./Gobelet";
import Joueur from "./Joueur";
export default class Partie {
  private _nbToursRestant: number;
  private _joueurs: Joueur[] = [];
  private _gobelet: Gobelet = new Gobelet();
  private _maxDe: number;

  /**
   * @param nbTours nombre de tour que la partie aura
   * @param maxDe Facultatif, permet de créer un dé de la taille souhaité. sinon créer des dé 6.
   */
  constructor(nbTours: number, maxDe?: number) {
    this._nbToursRestant = nbTours;
    this._maxDe = maxDe || 6;
  }

  public get nbToursRestant(): number {
    return this._nbToursRestant;
  }

  public get joueurs(): Joueur[] {
    return this._joueurs;
  }

  public gobelet(): Gobelet {
    return this._gobelet;
  }

  public maxDe(): number {
    return this._maxDe;
  }

  /**
   * Permet d'avoir un nombre pair de joueur avec un nombre impair de tour. Et inversement.
   */
  private nbTourCorrect(): void {
    if (this.joueurs.length % 2 === this.nbToursRestant % 2) {
      this._nbToursRestant++;
    }
  }

  /**
   * initialise le joueur et lui met un dé dans le gobelet
   * @param nomJoueur
   */
  private initialiserJoueur(nomJoueur: string): void {
    const joueur: Joueur = new Joueur(nomJoueur);
    this._joueurs.push(joueur);
    const de: De = new De(this._maxDe);
    this._gobelet.ajouterDe(de);
  }

  /**
   * initialise tout le nécessaire pour la partie et vérifie la condition pour le nombre de tours par rapport au nombre de joueurs
   * @param nomJoueurs le nom des joueurs
   */
  public initialiserPartie(...nomJoueurs: string[]): void {
    nomJoueurs.forEach((nom) => {
      this.initialiserJoueur(nom);
    });
    this.nbTourCorrect();
  }

  /**
   * Compare la somme du gobelet du joueur avec la plus grande valeur de gobelet de la manche.
   * @param resultatJoueur Sommes des valeurs de tous les dé du gobelet pour le lancé du joueur cette manche.
   * @param plusGrandGobelet La somme la plus grande actuel lancé cette manche par un joueur.
   * @returns true si plus grand, sinon false.
   */
  private plusgrand(resultatJoueur: number, plusGrandGobelet: number): boolean {
    if (resultatJoueur > plusGrandGobelet) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Ajoute 1 à la valeur nbMancheGagne de joueur si celui si a gagné la manche.
   * @param valeurPlusGrandGobelet
   */
  private aGagnerLaManche(valeurPlusGrandGobelet: number) {
    this._joueurs.forEach((joueur) => {
      if (joueur.scoreDeLaManche === valeurPlusGrandGobelet) {
        joueur.gagneLaManche();
      }
    });
  }

  /**
   * Permet de démarrer la partie et le fait tourner jusqu'au sa fin.
   */
  public lancerPartie(): void {
    while (this._nbToursRestant > 0) {
      let plusGrandGobelet: number = 0;
      this.joueurs.forEach((joueur) => {
        let resultatJoueur: number = joueur.jouer(this._gobelet);
        if (this.plusgrand(resultatJoueur, plusGrandGobelet)) {
          plusGrandGobelet = resultatJoueur;
        }
      });
      this.aGagnerLaManche(plusGrandGobelet);
      this._nbToursRestant--;
    }
  }

  /**
   * Affiche le gagnant de la partie
   */
  public afficherGagnant(): void {
    let plusMancheGagne: number = this._joueurs[0].nbMancheGagne;
  }
}
