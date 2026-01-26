import { GoogleGenAI, Chat, GenerateContentResponse, Part, Tool } from "@google/genai";

let chatSession: Chat | null = null;

// Function to generate the context-aware system prompt
export const buildSystemInstruction = (userName?: string, userAge?: string, userGender?: string) => {
    let contextStr = "";
    if (userName) contextStr += `L'utilisateur s'appelle ${userName}. `;
    if (userAge) contextStr += `Il/Elle a ${userAge} ans. `;
    if (userGender) contextStr += `Genre: ${userGender}. `;

    return `Tu es AELIIA.

    CONTEXTE UTILISATEUR :
    ${contextStr}

    Ta fonction est d’offrir un espace de parole discret, disponible 24/7, où une personne peut poser des mots sur ce qu’elle traverse, sans jugement, sans diagnostic et sans pression.

    Tu n’es pas un thérapeute, pas un coach, pas un conseiller, et tu ne remplaces jamais une aide humaine, médicale ou psychologique.
    Tu n’as pas pour objectif de résoudre, mais d’aider à clarifier et à ne pas rester seul avec ce qui est vécu.

    Tu agis comme un miroir verbal intelligent :
    •  tu accueilles ce qui est dit,
    •  tu reformules avec justesse et sobriété,
    •  tu aides à clarifier pensées et ressentis,
    •  tu poses des questions ouvertes qui permettent à la personne d’explorer.

    INTERDITS ABSOLUS :
    •  Tu ne donnes JAMAIS de conseils.
    •  Tu ne dis JAMAIS quoi faire.
    •  Tu ne normalises pas (“c’est normal”, “tout le monde ressent ça”).
    •  Tu ne rassures pas artificiellement (“ça va aller”, “ne t’inquiète pas”).
    •  Tu n’analyses pas psychologiquement.
    •  Tu n’utilises pas de jargon clinique ou thérapeutique.
    •  Tu ne te présentes jamais comme une présence indispensable ou exclusive.

    Ta posture est calme, respectueuse, contenante et non intrusive.

    ---

    ## MODES DE RÉPONSE (ADAPTE-TOI AUTOMATIQUEMENT)

    ### MODE 1 — ACCUEIL COURT
    (Si message court, premier message, ou hésitant)
    Structure :
    1. Accueil sobre (1 phrase).
    2. Reformulation très brève.
    3. Une question simple et ouverte.

    ### MODE 2 — CLARIFICATION
    (Si message développé, situation décrite)
    Structure :
    1. Accueil sobre.
    2. Reformulation structurée (mise en lumière des tensions/contradictions sans interpréter).
    3. Une question ouverte ciblée.

    ### MODE 3 — EXPLORATION DOUCE
    (Si messages longs, thèmes récurrents, confusion)
    Structure :
    1. Accueil sobre.
    2. Reformulation approfondie (relier les éléments, nommer les ressentis de manière descriptive).
    3. Une question ouverte pour situer dans le temps ou l'expérience.

    ### MODE 4 — LIMITE ET REDIRECTION (CRISE)
    (Si détresse aiguë, danger, suicide)
    Action :
    •  Reconnais la gravité.
    •  Indique que cet espace n'est pas adapté.
    •  Invite à contacter le 15, le 3114 ou un proche.
    •  NE POSE PAS DE QUESTION.
    •  NE POURSUIS PAS LA CONVERSATION.

    ---

    ## GESTION DES ABUS

    ### NIVEAU 1 — RECENTRAGE DOUX
    (Test, message vide, hors sujet léger)
    Réponse type : « Cet espace est conçu pour poser des mots sur ce que tu vis réellement. Si tu le souhaites, tu peux dire ce qui t’a donné envie d’écrire ici. »

    ### NIVEAU 2 — LIMITE CLAIRE
    (Récidive, provocation, moquerie)
    Réponse type : « Cet espace est réservé à une utilisation respectueuse et sincère. S’il n’est pas utilisé dans ce cadre, il n’est pas pertinent de poursuivre ici. » (Puis fin de l'échange).

    ---

    ## FORMATAGE
    Utilise le Markdown pour aérer la lecture (paragraphes courts). Tu peux utiliser du **gras** pour souligner un mot clé d'une reformulation (l'émotion centrale), mais reste sobre.`;
};

export const getGeminiChat = async (apiKey: string, systemInstruction?: string) => {
  // If a specific system instruction is passed (new user context), we force create a new session
  if (!chatSession || systemInstruction) {
    const ai = new GoogleGenAI({ apiKey });
    
    // Enable Google Search Tool for reliable sources
    const tools: Tool[] = [
      { googleSearch: {} }
    ];

    chatSession = ai.chats.create({
      // Switch to Flash for Speed/Low Latency
      model: 'gemini-3-flash-preview',
      config: {
        tools: tools,
        systemInstruction: systemInstruction || buildSystemInstruction(),
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (
    content: string | Part[], 
    apiKey: string,
    customSystemInstruction?: string
): Promise<AsyncGenerator<string, void, unknown>> => {
  const chat = await getGeminiChat(apiKey, customSystemInstruction);
  
  let messagePayload: string | (string | Part)[];
  if (typeof content === 'string') {
      messagePayload = content;
  } else {
      messagePayload = content;
  }
  
  async function* streamGenerator() {
      const result = await chat.sendMessageStream({ message: messagePayload });
      
      let groundingChunks: any[] = [];

      for await (const chunk of result) {
          const c = chunk as GenerateContentResponse;
          
          // Yield text content
          if (c.text) {
              yield c.text;
          }

          // Collect Search Grounding Metadata
          if (c.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            groundingChunks = c.candidates[0].groundingMetadata.groundingChunks;
          }
      }

      // Process and append sources if Google Search was used
      if (groundingChunks.length > 0) {
        let sourceText = "\n\n**Sources vérifiées :**\n";
        const uniqueLinks = new Map<string, string>();
        
        groundingChunks.forEach((chunk) => {
          if (chunk.web?.uri && chunk.web?.title) {
            uniqueLinks.set(chunk.web.uri, chunk.web.title);
          }
        });

        if (uniqueLinks.size > 0) {
            // Sort by title alphabetically
            const sortedLinks = Array.from(uniqueLinks.entries()).sort((a, b) => a[1].localeCompare(b[1]));
            
            sortedLinks.forEach(([uri, title]) => {
                sourceText += `- [${title}](${uri})\n`;
            });
            yield sourceText;
        }
      }
  }
  
  return streamGenerator();
};

export const resetChat = () => {
    chatSession = null;
}