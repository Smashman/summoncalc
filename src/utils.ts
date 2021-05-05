export const maxSpellLevel = 9;
export const minSpellAttack = 1;
export const maxSpellAttack = 15;
export const minSpellDC = 10;
export const maxSpellDC = 24;

// Kept for future potential uses
// export const calcProf = (level: CharLevel): ProfBonus => (1 + Math.ceil(level / 4)) as ProfBonus;
// export const calcSpellAttack = (charLevel: CharLevel, spellMod: number, spellAttackBonus: number = 0) => calcProf(charLevel) + spellMod + spellAttackBonus;
// export const calcSpellDC = (charLevel: CharLevel, spellMod: number, spellDCBonus: number = 0) => 8 + spellDCBonus + calcSpellAttack(charLevel, spellMod);

export const calcMod = (score: number) => Math.floor((score - 10) / 2);
export const toTitleCase = (string: string) =>
    string
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const sortByName = <T extends { name: string }[]>(contents: T) => [...contents].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

export const spellAttackId = 'spell-attack';
export const spellDCId = 'spell-dc';
export const spellLevelId = 'spell-level';
