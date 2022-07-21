type Size = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';
type CreatureType =
  | 'abberation'
  | 'beast'
  | 'celestial'
  | 'construct'
  | 'dragon'
  | 'elemental'
  | 'fey'
  | 'fiend'
  | 'monstrosity'
  | 'undead';

type SpeedTypes = keyof Speed;

interface Speed {
  walk: number;
  burrow?: number;
  climb?: number;
  fly?: { speed: number; hover?: boolean };
  swim?: number;
}

interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface HP {
  base: number;
  perLevel: number;
}

type ContentFunc = (spellDC: SpellLevel, spellLevel: number) => string;

interface Content {
  name: string;
  content: string | ContentFunc;
}

type DamageType =
  | 'acid'
  | 'bludgeoning'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'piercing'
  | 'poison'
  | 'psychic'
  | 'radiant'
  | 'slashing'
  | 'thunder';

type Condition =
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'exhaustion'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious';

interface Damage {
  dice: {
    number: number;
    size: '4' | '6' | '8' | '10' | '12' | '20';
  };
  modifier: number;
  type: DamageType;
}

interface Attack {
  name: string;
  type: 'melee' | 'ranged';
  weapon: 'weapon' | 'spell';
  range: string | number;
  target: 'target' | 'creature';
  damage: Damage[];
  additionalText?: string | ContentFunc;
}

interface SummonMode extends Partial<Omit<Summon, 'name' | 'hp' | 'speed'>> {
  name: string;
  hp?: {
    base: number;
  };
  speed?: Partial<Speed>;
}

interface Summon {
  id: string;
  name: string;
  shortName: string;
  spellName?: string;
  minSpellLevel: SpellLevel;
  page: number;
  size: Size;
  type: CreatureType;
  baseAC: number;
  hp: HP;
  speed: Speed;
  abilityScores: AbilityScores;
  damageResistances?: DamageType[];
  damageImmunities?: DamageType[];
  conditionImmunities?: Condition[];
  darkvision?: number;
  blindsight?: number;
  languages: string[];
  traits?: Content[];
  multiattack?: ContentFunc;
  attacks?: Attack[];
  actions?: Content[];
  bonusActions?: Content[];
  reactions?: Content[];
  modes: SummonMode[];
  modeName?: string;
  sourceName?: string;
  isUA?: boolean;
}

// type CharLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
// type SpellLevel = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // No first level summon spells
// type ProfBonus = 2 | 3 | 4 | 5 | 6;

type CharLevel = number;
type SpellLevel = number;
type ProfBonus = number;
