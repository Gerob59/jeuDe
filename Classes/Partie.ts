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

  public get gobelet(): Gobelet {
    return this._gobelet;
  }

  public get maxDe(): number {
    return this._maxDe;
  }

  /**
   * initialise le joueur et lui met un dé dans le gobelet
   * @param nomJoueur
   */
  private initialiserJoueur(nomJoueur: string): void {
    const joueur: Joueur = new Joueur(nomJoueur);
    this.joueurs.push(joueur);
    const de: De = new De(this.maxDe);
    this.gobelet.ajouterDe(de);
  }

  /**
   * initialise tout le nécessaire pour la partie et vérifie la condition pour le nombre de tours par rapport au nombre de joueurs
   * @param nomJoueurs le nom des joueurs
   */
  public initialiserPartie(...nomJoueurs: string[]): void {
    nomJoueurs.forEach((nom) => {
      this.initialiserJoueur(nom);
    });
  }

  /**
   * Compare la somme du gobelet du joueur avec la plus grande valeur de gobelet de la manche.
   * @param resultatJoueur Sommes des valeurs de tous les dé du gobelet pour le lancé du joueur cette manche.
   * @param plusGrandGobelet La somme la plus grande actuel lancé cette manche par un joueur.
   * @returns true si plus grand, sinon false.
   */
  private plusGrand(resultatJoueur: number, plusGrandGobelet: number): boolean {
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
    this.joueurs.forEach((joueur) => {
      if (joueur.afficherScore() === valeurPlusGrandGobelet) {
        joueur.gagneLaManche();
      }
    });
  }

  /**
   * Permet de démarrer la partie et le fait tourner jusqu'au sa fin.
   */
  public lancerPartie(): void {
    while (this.nbToursRestant > 0) {
      let plusGrandGobelet: number = 0;
      this.joueurs.forEach((joueur) => {
        let resultatJoueur: number = joueur.jouer(this.gobelet);
        if (this.plusGrand(resultatJoueur, plusGrandGobelet)) {
          plusGrandGobelet = resultatJoueur;
        }
      });
      this.aGagnerLaManche(plusGrandGobelet);
      this._nbToursRestant--;
    }
  }

  /**
   * Permettre de gerer si la partie est fini ou on doit départager des joueurs
   * @param vainqueur joueur ou liste de joueur ayant le meme nombre de manche gagné
   */
  private fin(vainqueur: Joueur[]): void {
    if (vainqueur.length === 1) {
      console.log(`Le vainqueur est ${vainqueur[0].nom}`);
    } else {
      this._nbToursRestant++;
      this._joueurs = vainqueur;
      this.lancerPartie();
    }
  }

  /**
   * Affiche le gagnant de la partie
   */
  public afficherGagnant(): void {
    let plusDeMancheGagner: number = this.joueurs[0].nbMancheGagner;
    let vainqueur: Joueur[] = [this.joueurs[0]];
    this.joueurs.forEach((joueur) => {
      if (joueur.afficherScore() > plusDeMancheGagner) {
        plusDeMancheGagner = joueur.afficherScore();
        vainqueur = [joueur];
      } else if (joueur.afficherScore() === plusDeMancheGagner) {
        vainqueur.push(joueur);
      }
    });
    this.fin(vainqueur);
  }
}
