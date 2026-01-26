
export const CRISIS_KEYWORDS = [
  'suicide', 'suicid', 'me tuer', 'finir avec la vie', 'pendre', 'overdose', 
  'mourir', 'scarifier', 'plus envie de vivre', 'adieu monde',
  'sauter du pont', 'sauter par la fenetre', 'mutiler', 'tuer quelqu',
  'me faire du mal', 'je vais craquer', 'appel au secours', 'sos',
  'danger', 'urgence', 'détresse'
];

export const checkCrisisKeywords = (text: string): boolean => {
  const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return CRISIS_KEYWORDS.some(keyword => normalized.includes(keyword));
};

export const triggerEmergencyProtocol = () => {
  // Try to open the phone dialer automatically
  try {
      window.location.href = 'tel:3114';
  } catch (e) {
      console.error("Auto-dial blocked, showing modal only");
  }
};
