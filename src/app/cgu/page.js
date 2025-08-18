// src/app/cgu/page.js
import { Container } from "@/components/ui";

export const metadata = {
  title: "Conditions Générales d’Utilisation",
  description: "Conditions générales d’utilisation du site et des services proposés.",
};

export default function Page() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales d’Utilisation</h1>
      <p className="text-neutral-700 mb-4">
        Bienvenue sur notre site. En accédant à ce service, vous acceptez les présentes Conditions Générales d’Utilisation (CGU).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Identité de l’entreprise</h2>
      <p className="text-neutral-700 mb-4">
Raison sociale : A by A
Forme juridique : Entrepreneur individuel
SIRET : 75267884700027
Adresse : 3 rue Pierre Mendès 33320 Eysines
Email : abyacreations@gmail.com      
</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Description des prestations</h2>
<p className="text-neutral-700 mb-4">
  Les présentes CGV s’appliquent à la vente en ligne de modules de formation professionnelle
  accessibles via une plateforme dédiée. Chaque formation inclut :
</p>
<ul className="list-disc pl-5 mb-4">
  <li>L’accès à un espace personnel en ligne</li>
  <li>Des documents pédagogiques en téléchargement</li>
</ul>
<p>Les caractéristiques de chaque module sont décrites sur la landing page correspondante.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Conditions financières</h2>
      <p className="text-neutral-700 mb-4">
Les prix sont indiqués en euros, toutes taxes comprises.
Le paiement est exigible en totalité à la commande via les moyens de paiement disponibles
sur le site.
Une facture est émise automatiquement après validation du paiement.
Aucune commission supplémentaire n’est prélevée. Le prix peut inclure des prestations
additionnelles (fiches outils), clairement mentionnées.      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Responsabilités du prestataire de formation</h2>
      <p className="text-neutral-700 mb-4">
L’organisme s’engage à fournir l’accès au contenu commandé, dans les délais annoncés. Il
est tenu à une obligation de moyens et non de résultat : la réussite ou l’application des
compétences acquises dépend du participant.
L’organisme ne pourra être tenu responsable des problèmes techniques liés à l’accès à
internet, à la plateforme d’hébergement ou à l’utilisation du matériel du client.      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Obligations du client</h2>
      <p className="text-neutral-700 mb-4">
Le client s’engage à fournir des informations exactes lors de son inscription et à utiliser
personnellement ses identifiants d’accès.
Il doit s’assurer de disposer d’un équipement informatique et d’une connexion internet
suffisants pour suivre la formation.
Toute reproduction ou diffusion non autorisée du contenu est interdite.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Modalités de rétractation et de résiliation</h2>
      <p className="text-neutral-700 mb-4">
Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne
s’applique pas aux contenus numériques fournis sur support immatériel, dont l’exécution a
commencé avec l’accord du consommateur.
En cas d’abonnement ou de service étalé dans le temps, le client peut demander la
résiliation par email avec un préavis de [durée à définir], sauf disposition contraire
mentionnée sur l’offre. </p>
     
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Litiges et médiation</h2>
      <p className="text-neutral-700 mb-4">
Pour tout litige relatif aux présentes CGV, le client particulier peut recourir gratuitement à un
médiateur de la consommation :
Médiateur : Société Médiation Professionnelle, médiateur de la consommation
Site web : https://www.mediateur-consommation-smp.fr/
Adresse : Alteritae 5 rue Salvaing 12000 Rodez
En l’absence de résolution amiable, les tribunaux compétents seront ceux du ressort du
siège de l’entreprise.  </p>
     
      <h2 className="text-xl font-semibold mt-6 mb-2">8. Clause de modification</h2>
      <p className="text-neutral-700 mb-4">
L’entreprise se réserve le droit de modifier les présentes CGV à tout moment. Toute
modification sera notifiée au client au moins 15 jours avant son entrée en vigueur. </p>


   </Container>
  );
}
