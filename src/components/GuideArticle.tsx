export default function GuideArticle() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <article className="mx-auto max-w-3xl">
          <header className="mb-8 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-accent-600">Guide complet 2026</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
              Comment acheter une palette Amazon en France
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-600">
              Vous souhaitez vous lancer dans l’achat de palettes de retour Amazon France ou explorer les invendus
              grossiste pour revendre ? Ce guide vous explique tout ce qu’il faut savoir avant d’investir.
            </p>
          </header>

          <div className="space-y-10 text-[15px] leading-relaxed text-brand-700">
            <div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">
                Qu’est-ce qu’une palette Amazon et pourquoi en acheter ?
              </h3>
              <p>
                Une palette Amazon invendus regroupe des articles retournés par des clients ou des stocks non écoulés,
                revendus en lots à prix réduit. Il s’agit d’un segment en pleine croissance en Europe, attirant aussi
                bien les particuliers que les revendeurs professionnels cherchant à constituer un stock fin de série à
                moindre coût.
              </p>
              <p className="mt-3">
                La distinction entre une palette Amazon invendus et une palette déstockage marques est fondamentale : la
                première contient des articles mixtes toutes catégories, souvent sans emballage d’origine, tandis que la
                seconde porte des références de marques identifiées, plus faciles à valoriser à la revente.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">Calculer la rentabilité avant d’acheter</h3>
              <p>
                La rentabilité d’une palette de déstockage dépend de plusieurs variables. Avant tout achat, estimez le
                taux de produits revendables (généralement entre 60 % et 85 %), le prix de revente moyen par article, et
                déduisez les frais logistiques.
              </p>
              <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-5">
                <p className="text-sm font-semibold text-brand-900">Formule simple</p>
                <p className="mt-2 text-sm text-brand-700">
                  Marge nette = (Prix de revente moyen × Quantité vendable) − Prix d’achat palette − Frais de transport −
                  Frais de plateforme
                </p>
              </div>
              <p className="mt-4">
                Pour revendre une palette de liquidation efficacement, ciblez un ratio prix d’achat / valeur retail d’au
                moins 1:4. En dessous, la marge devient trop fragile pour absorber les invendus résiduels.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">
                Les meilleures catégories de palettes à revendre en Europe
              </h3>
              <p>Voici les catégories les plus demandées pour les lots de liquidation revendeur :</p>
              <ul className="mt-4 space-y-2">
                {[
                  ['Électronique grand public', 'smartphones reconditionnés, écouteurs, tablettes'],
                  ['Outillage électroportatif', 'Milwaukee, DeWalt, Makita'],
                  ['Cosmétiques et beauté', 'forte demande sur Vinted et les marchés locaux'],
                  ['Textile mode', 'idéal pour les vendeurs professionnels sur plateformes C2C'],
                  ['Petit électroménager', 'rotation rapide, marges solides'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    <span>
                      <strong className="font-semibold text-brand-900">{k} :</strong> {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">
                Déstockage outils : Milwaukee, DeWalt, Makita — lequel choisir ?
              </h3>
              <p>
                Les palettes outils Milwaukee, le déstockage DeWalt grossiste et les lots Makita sont parmi les plus
                recherchés en Europe. Chaque marque a son profil :
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  ['Milwaukee', 'premium, clientèle professionnelle, prix de revente élevé mais stock plus rare'],
                  ['DeWalt', 'excellent compromis entre disponibilité et valeur, forte demande en France et en Belgique'],
                  ['Makita', 'apprécié des particuliers comme des pros, rotation rapide sur les plateformes généralistes'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    <span>
                      <strong className="font-semibold text-brand-900">{k} :</strong> {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">Livraison en Belgique et en Suisse</h3>
              <p>
                La palette liquidation Belgique et le déstockage Suisse suivent des règles spécifiques. En Belgique, les
                livraisons intra-UE sont simplifiées. En Suisse, hors espace douanier européen, prévoyez des frais de
                dédouanement (TVA suisse + droits de douane selon la nature des marchandises). Consultez toujours le
                tarif transport complet auprès de votre fournisseur avant de valider une commande transfrontalière.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
