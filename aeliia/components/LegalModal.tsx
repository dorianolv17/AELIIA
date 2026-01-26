import React, { useState } from 'react';
import { X, Shield, FileText, Scale, AlertTriangle, Lock, Eye } from 'lucide-react';

interface LegalModalProps {
  onClose: () => void;
  initialTab?: 'mentions' | 'privacy' | 'cgu';
}

export const LegalModal: React.FC<LegalModalProps> = ({ onClose, initialTab = 'mentions' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="bg-[#09090b] border border-zinc-800 w-full max-w-5xl h-[90vh] rounded-3xl relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" /> Informations Légales & Sécurité
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-black overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('mentions')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'mentions' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            Mentions Légales
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            Politique de Confidentialité (RGPD)
          </button>
          <button 
            onClick={() => setActiveTab('cgu')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'cgu' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            CGU & Avertissement Médical
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-zinc-400 text-sm leading-relaxed space-y-8 custom-scrollbar bg-[#050505]">
          
          {/* GLOBAL WARNING BANNER */}
          <div className="bg-red-950/20 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="text-red-400 font-bold text-base mb-1">AVERTISSEMENT : NON-SUBSTITUTION MÉDICALE</h4>
                <p className="text-red-200/80 text-sm">
                    AELIIA est une intelligence artificielle d'accompagnement. <strong>Ce n'est PAS un dispositif médical.</strong><br/>
                    L'utilisation de ce service ne remplace en aucun cas une consultation, un diagnostic ou un traitement établi par un médecin, un psychiatre ou un psychologue.
                    <br/><br/>
                    En cas d'urgence vitale ou de pensées suicidaires, <strong>appelez immédiatement le 15 (SAMU) ou le 3114 (Prévention Suicide).</strong>
                </p>
            </div>
          </div>

          {activeTab === 'mentions' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 max-w-4xl">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Mentions Légales</h3>
              
              <section>
                <h4 className="text-white font-bold text-lg mb-3">1. Éditeur du Site</h4>
                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                    <p className="mb-2">Le site AELIIA (ci-après "le Site") est édité par :</p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        <li><strong>Dénomination sociale :</strong> [VOTRE SOCIÉTÉ / NOM]</li>
                        <li><strong>Forme juridique :</strong> [SAS / SASU / Auto-entreprise]</li>
                        <li><strong>Capital social :</strong> [MONTANT] €</li>
                        <li><strong>Siège social :</strong> [VOTRE ADRESSE COMPLÈTE]</li>
                        <li><strong>SIRET :</strong> [VOTRE NUMÉRO SIRET]</li>
                        <li><strong>RCS :</strong> [VILLE] B [NUMÉRO]</li>
                        <li><strong>TVA Intracommunautaire :</strong> [NUMÉRO TVA]</li>
                        <li><strong>Directeur de la publication :</strong> [VOTRE NOM]</li>
                        <li><strong>Contact :</strong> contact@aeliia.com</li>
                    </ul>
                </div>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">2. Hébergement</h4>
                <p>Le Site est hébergé par la société <strong>Netlify, Inc.</strong></p>
                <p className="mt-2 text-xs text-zinc-500">
                    Adresse : 2325 3rd Street, Suite 215, San Francisco, California 94107, USA.<br/>
                    Site web : https://www.netlify.com
                </p>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">3. Propriété Intellectuelle</h4>
                <p>
                    L'ensemble des éléments figurant sur le Site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le Site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
                </p>
                <p className="mt-2">
                    Toute reproduction, représentation, adaptation, ou exploitation partielle ou intégrale des contenus, marques et services proposés par le Site, par quelque procédé que ce soit, sans l'autorisation préalable, expresse et écrite de l'éditeur, est strictement interdite et serait susceptible de constituer une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 max-w-4xl">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Politique de Confidentialité</h3>
              
              <div className="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-xl mb-8 flex gap-4">
                <Shield className="w-10 h-10 text-indigo-400 flex-shrink-0" />
                <div>
                    <h4 className="text-indigo-300 font-bold mb-2">Notre engagement éthique</h4>
                    <p className="text-indigo-200/80 text-sm">
                        AELIIA a été conçue selon le principe de <em>Privacy by Design</em>. Nous ne vendons pas vos données. Nous ne les utilisons pas pour faire de la publicité ciblée. Notre modèle économique repose uniquement sur les abonnements payants.
                    </p>
                </div>
              </div>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">1. Données collectées</h4>
                <p className="mb-3">Nous limitons la collecte des données au strict nécessaire (Minimisation des données) :</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                        <strong className="text-white block mb-1">Compte Utilisateur</strong>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>Email (Identifiant unique)</li>
                            <li>Mot de passe (Chiffré/Hashé)</li>
                            <li>Prénom (Pour la personnalisation)</li>
                        </ul>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                        <strong className="text-white block mb-1">Conversations</strong>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>Historique des messages (Texte)</li>
                            <li>Transcriptions des échanges vocaux</li>
                            <li>Aucun enregistrement audio brut n'est conservé.</li>
                        </ul>
                    </div>
                </div>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">2. Traitement par l'IA (Google Gemini)</h4>
                <p>
                    Pour générer les réponses, le contenu de vos messages est transmis de manière sécurisée (TLS 1.3) à l'API <strong>Google Gemini</strong>.
                </p>
                <ul className="mt-3 space-y-2 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <li className="flex gap-2 items-center">
                        <Lock className="w-4 h-4 text-green-500" />
                        <span>Les données transitent de manière chiffrée.</span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <Eye className="w-4 h-4 text-green-500" />
                        <span>Nous avons activé les paramètres de confidentialité interdisant à Google d'utiliser vos données pour entraîner ses modèles publics.</span>
                    </li>
                </ul>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">3. Cas spécifique : Levée de l'anonymat (Danger grave)</h4>
                <p>
                    Conformément à la loi (Article 223-6 du Code pénal sur la non-assistance à personne en danger), si l'IA ou nos systèmes détectent une intention claire et imminente de suicide ou de mise en danger d'autrui, <strong>l'anonymat peut être levé</strong> pour transmettre les informations nécessaires (adresse IP, email) aux services de secours compétents (Police, Pompiers, SAMU).
                </p>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">4. Vos Droits</h4>
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Droit d'accès et de portabilité de vos données.</li>
                    <li>Droit de rectification.</li>
                    <li>Droit à l'effacement ("Droit à l'oubli").</li>
                </ul>
                <p className="mt-4 text-sm text-zinc-500">Pour exercer ces droits, contactez notre DPO à : privacy@aeliia.com</p>
              </section>
            </div>
          )}

          {activeTab === 'cgu' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 max-w-4xl">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Conditions Générales d'Utilisation (CGU)</h3>
              
              <section>
                <h4 className="text-white font-bold text-lg mb-3">ARTICLE 1 : Objet et Acceptation</h4>
                <p>
                    Les présentes CGU ont pour objet de définir les modalités de mise à disposition des services du site AELIIA. Tout accès et/ou utilisation du site suppose l'acceptation et le respect de l'ensemble des termes des présentes conditions. Dans le cas où l'utilisateur ne souhaite pas accepter tout ou partie des présentes CGU, il lui est demandé de renoncer à tout usage du service.
                </p>
              </section>

              <section className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                <h4 className="text-red-400 font-bold text-lg mb-3">ARTICLE 2 : Avertissement Médical (Clause Essentielle)</h4>
                <p className="text-red-100 font-semibold mb-2">
                    L'Utilisateur reconnaît expressément que :
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                    <li><strong>AELIIA n'est pas un médecin.</strong> Le service ne fournit aucun diagnostic, aucun traitement, ni aucune prescription.</li>
                    <li>Les conseils ou exercices proposés (respiration, TCC, journaling) sont des outils de développement personnel et de bien-être, et non des soins médicaux.</li>
                    <li>L'Utilisateur ne doit jamais retarder une consultation médicale ou ignorer un avis médical en raison d'une information reçue via AELIIA.</li>
                </ol>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">ARTICLE 3 : Gestion des Situations de Crise</h4>
                <p>
                    AELIIA intègre un algorithme de détection de mots-clés liés à la détresse vitale (suicide, automutilation, violence).
                </p>
                <p className="mt-2">
                    En cas de détection d'un tel risque :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-300">
                    <li>L'IA cessera immédiatement son rôle de "confident".</li>
                    <li>Un message d'alerte bloquant apparaîtra ("Modal de Crise").</li>
                    <li>L'utilisateur sera invité impérativement à contacter le 15, le 112 ou le 3114.</li>
                </ul>
                <p className="mt-2 text-zinc-500 text-xs italic">
                    L'éditeur ne peut être tenu responsable si l'IA échoue à détecter une situation de crise (obligation de moyens, non de résultat technologique absolu).
                </p>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">ARTICLE 4 : Responsabilité de l'Éditeur</h4>
                <p>
                    L'Éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au service. Cependant, l'IA générative peut produire des informations inexactes ("hallucinations"). L'Utilisateur conserve l'entière responsabilité de l'interprétation et de l'utilisation des contenus générés.
                </p>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">ARTICLE 5 : Accès au Service</h4>
                <p>
                    Le Service est accessible gratuitement pour les fonctionnalités de base. Certaines fonctionnalités avancées (Mode Vocal, Mémoire Longue) nécessitent un abonnement payant ("Sérénité"). L'Éditeur se réserve le droit de modifier, suspendre ou interrompre l'accès à tout ou partie du Service pour maintenance ou mise à jour.
                </p>
              </section>

              <section>
                <h4 className="text-white font-bold text-lg mb-3">ARTICLE 6 : Droit Applicable</h4>
                <p>
                    Les présentes CGU sont soumises au droit français. En cas de litige n'ayant pu faire l'objet d'un accord amiable, les tribunaux français seront seuls compétents.
                </p>
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};