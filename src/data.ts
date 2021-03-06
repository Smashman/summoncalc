import { toWords } from 'number-to-words';
import { sortByName } from './utils';

const understandsLanguages = 'understands the languages you speak';

const aberrantSummon: Summon = {
  id: 'aberration',
  name: 'Aberrant Spirit',
  shortName: 'aberration',
  minSpellLevel: 4,
  page: 109,
  size: 'medium',
  type: 'abberation',
  baseAC: 11,
  hp: {
    base: 40,
    perLevel: 10,
  },
  speed: { walk: 30 },
  abilityScores: {
    str: 16,
    dex: 10,
    con: 15,
    int: 16,
    wis: 10,
    cha: 6,
  },
  damageImmunities: ['psychic'],
  languages: ['Deep Speech', understandsLanguages],
  modes: [
    {
      name: 'Beholderkin',
      speed: {
        fly: { speed: 30, hover: true },
      },
      attacks: [
        {
          name: 'Eye Ray',
          type: 'ranged',
          weapon: 'spell',
          range: 150,
          target: 'creature',
          damage: [
            {
              dice: {
                number: 1,
                size: '8',
              },
              modifier: 3,
              type: 'psychic',
            },
          ],
        },
      ],
    },
    {
      name: 'Slaad',
      traits: [
        {
          name: 'Regeneration',
          content:
            'The aberration regains 5 hit points at the start of its turn if it has at least 1 hit point.',
        },
      ],
      attacks: [
        {
          name: 'Claws',
          type: 'melee',
          weapon: 'weapon',
          range: 5,
          target: 'target',
          damage: [
            {
              dice: {
                number: 1,
                size: '10',
              },
              modifier: 3,
              type: 'slashing',
            },
          ],
          additionalText:
            ". If the target is a creature, it can't regain hit points until the start of the aberration's next turn",
        },
      ],
    },
    {
      name: 'Star Spawn',
      traits: [
        {
          name: 'Whispering Aura',
          content: (spellDC) =>
            `At the start of each of the aberration's turns, each creature within 5 feet of the aberration must succeed on a DC ${spellDC} Wisdom saving throw or take 2d6 psychic damage, provided that the aberration isn't incapacitated.`,
        },
      ],
      attacks: [
        {
          name: 'Psychic Slam',
          type: 'melee',
          weapon: 'spell',
          range: 5,
          target: 'creature',
          damage: [
            {
              dice: {
                number: 1,
                size: '8',
              },
              modifier: 3,
              type: 'psychic',
            },
          ],
        },
      ],
    },
  ],
};

const beastSummon: Summon = {
  id: 'beast',
  name: 'Bestial Spirit',
  shortName: 'beast',
  minSpellLevel: 2,
  page: 109,
  size: 'small',
  type: 'beast',
  baseAC: 11,
  hp: {
    base: 30,
    perLevel: 5,
  },
  speed: { walk: 30 },
  abilityScores: {
    str: 18,
    dex: 11,
    con: 16,
    int: 4,
    wis: 14,
    cha: 5,
  },
  languages: [understandsLanguages],
  attacks: [
    {
      name: 'Maul',
      type: 'melee',
      weapon: 'weapon',
      range: 5,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '8',
          },
          modifier: 4,
          type: 'piercing',
        },
      ],
    },
  ],
  modes: [
    {
      name: 'Air',
      hp: {
        base: 20,
      },
      speed: { fly: { speed: 60 } },
      traits: [
        {
          name: 'Flyby',
          content:
            "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
        },
      ],
    },
    {
      name: 'Land',
      speed: { climb: 30 },
      traits: [
        {
          name: 'Pack Tactics',
          content:
            "The beast has advantage on an attack roll against a creature if at least one of the beast's allies is within 5 feet of the creature and the ally isn't incapacitated.",
        },
      ],
    },
    {
      name: 'Water',
      speed: { swim: 30 },
      traits: [
        {
          name: 'Pack Tactics',
          content:
            "The beast has advantage on an attack roll against a creature if at least one of the beast's allies is within 5 feet of the creature and the ally isn't incapacitated.",
        },
        {
          name: 'Water Breathing',
          content: 'The beast can breathe only underwater.',
        },
      ],
    },
  ],
  modeName: 'Environment',
};

const celestialSummon: Summon = {
  id: 'celestial',
  name: 'Celestial Spirit',
  shortName: 'celestial',
  minSpellLevel: 5,
  page: 110,
  size: 'large',
  type: 'celestial',
  baseAC: 11,
  hp: {
    base: 40,
    perLevel: 10,
  },
  speed: { walk: 30, fly: { speed: 40 } },
  abilityScores: {
    str: 16,
    dex: 14,
    con: 16,
    int: 10,
    wis: 14,
    cha: 16,
  },
  damageImmunities: ['radiant'],
  conditionImmunities: ['charmed', 'frightened'],
  languages: ['Celestial', understandsLanguages],
  actions: [
    {
      name: 'Healing Touch (1/Day)',
      content: (_, spellLevel) =>
        `The celestial touches another creature. The target magically regains 2d8 + ${spellLevel} hit points.`,
    },
  ],
  modes: [
    {
      name: 'Avenger',
      attacks: [
        {
          name: 'Radiant Bow',
          type: 'ranged',
          weapon: 'weapon',
          range: '150/600',
          target: 'target',
          damage: [
            {
              dice: {
                number: 2,
                size: '6',
              },
              modifier: 2,
              type: 'radiant',
            },
          ],
        },
      ],
    },
    {
      name: 'Defender',
      baseAC: 13,
      attacks: [
        {
          name: 'Radiant Mace',
          type: 'melee',
          weapon: 'weapon',
          range: 5,
          target: 'target',
          damage: [
            {
              dice: {
                number: 1,
                size: '10',
              },
              modifier: 3,
              type: 'radiant',
            },
          ],
          additionalText:
            ', and the celestial can choose itself or another creature it can see within 10 feet of the target. The chosen creature gains 1d10 temporary hit points',
        },
      ],
    },
  ],
};

const constructSummon: Summon = {
  id: 'construct',
  name: 'Construct Spirit',
  shortName: 'construct',
  minSpellLevel: 4,
  page: 111,
  size: 'medium',
  type: 'construct',
  baseAC: 13,
  hp: {
    base: 40,
    perLevel: 15,
  },
  speed: { walk: 30 },
  abilityScores: {
    str: 18,
    dex: 10,
    con: 18,
    int: 14,
    wis: 11,
    cha: 5,
  },
  damageResistances: ['poison'],
  conditionImmunities: [
    'charmed',
    'exhaustion',
    'frightened',
    'incapacitated',
    'paralyzed',
    'petrified',
    'poisoned',
  ],
  languages: [understandsLanguages],
  attacks: [
    {
      name: 'Slam',
      type: 'melee',
      weapon: 'weapon',
      range: 5,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '8',
          },
          modifier: 4,
          type: 'bludgeoning',
        },
      ],
    },
  ],
  modes: [
    {
      name: 'Clay',
      reactions: [
        {
          name: 'Berserk Lashing',
          content:
            'When the construct takes damage, it makes a slam attack against a random creature within 5 feet of it. If no creature is within reach, the construct moves up to half its speed toward an enemy it can see, without provoking opportunity attacks.',
        },
      ],
    },
    {
      name: 'Metal',
      traits: [
        {
          name: 'Heated Body',
          content:
            'A creature that touches the construct or hits it with a melee attack while within 5 feet of it takes 1d10 fire damage.',
        },
      ],
    },
    {
      name: 'Stone',
      traits: [
        {
          name: 'Stony Lethargy',
          content: (spellDC) =>
            `When a creature the construct can see starts its turn within 10 feet of the construct, the construct can force it to make a DC ${spellDC} Wisdom saving throw. On a failed save, the target can't use reactions and its speed is halved until the start of its next turn.`,
        },
      ],
    },
  ],
  modeName: 'Material',
};

const elementalSlam: Attack = {
  name: 'Slam',
  type: 'melee',
  weapon: 'weapon',
  range: 5,
  target: 'target',
  damage: [
    {
      dice: {
        number: 1,
        size: '10',
      },
      modifier: 4,
      type: 'bludgeoning',
    },
  ],
};
const fireSlam: Attack = {
  ...elementalSlam,
  damage: [
    {
      dice: {
        number: 1,
        size: '10',
      },
      modifier: 4,
      type: 'fire',
    },
  ],
};
const amorphousForm: Content = {
  name: 'Amorphous Form',
  content:
    'The elemental can move through a space as narrow as 1 inch wide without squeezing.',
};
const elementalSummon: Summon = {
  id: 'elemental',
  name: 'Elemental Spirit',
  shortName: 'elemental',
  minSpellLevel: 4,
  page: 111,
  size: 'medium',
  type: 'elemental',
  modeName: 'element',
  baseAC: 11,
  hp: {
    base: 50,
    perLevel: 10,
  },
  speed: { walk: 40 },
  abilityScores: {
    str: 18,
    dex: 15,
    con: 17,
    int: 4,
    wis: 10,
    cha: 16,
  },
  damageImmunities: ['poison'],
  conditionImmunities: [
    'exhaustion',
    'paralyzed',
    'petrified',
    'poisoned',
    'unconscious',
  ],
  languages: ['Primordial', understandsLanguages],
  modes: [
    {
      name: 'Air',
      speed: { fly: { speed: 40, hover: true } },
      damageResistances: ['lightning', 'thunder'],
      traits: [amorphousForm],
      attacks: [elementalSlam],
    },
    {
      name: 'Earth',
      speed: { burrow: 40 },
      damageResistances: ['piercing', 'slashing'],
      attacks: [elementalSlam],
    },
    {
      name: 'Fire',
      damageImmunities: ['fire'],
      traits: [amorphousForm],
      attacks: [fireSlam],
    },
    {
      name: 'Water',
      speed: { swim: 40 },
      damageResistances: ['acid'],
      traits: [amorphousForm],
      attacks: [elementalSlam],
    },
  ],
};

const feyStepName = 'Fey Step';
const feyStepContentHead =
  'The fey magically teleports up to 30 feet to an unoccupied space it can see.';
const feySummon: Summon = {
  id: 'fey',
  name: 'Fey Spirit',
  shortName: 'fey',
  minSpellLevel: 3,
  page: 112,
  size: 'small',
  type: 'fey',
  baseAC: 12,
  hp: {
    base: 30,
    perLevel: 10,
  },
  speed: { walk: 40 },
  abilityScores: {
    str: 13,
    dex: 16,
    con: 14,
    int: 14,
    wis: 11,
    cha: 16,
  },
  conditionImmunities: ['charmed'],
  languages: ['Sylvan', understandsLanguages],
  attacks: [
    {
      name: 'Shortsword',
      type: 'melee',
      weapon: 'weapon',
      range: 5,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '6',
          },
          modifier: 3,
          type: 'piercing',
        },
        {
          dice: {
            number: 1,
            size: '6',
          },
          modifier: 0,
          type: 'force',
        },
      ],
    },
  ],
  modes: [
    {
      name: 'Fuming',
      bonusActions: [
        {
          name: feyStepName,
          content: `${feyStepContentHead} The fey has advantage on the next attack roll it makes before the end of this turn.`,
        },
      ],
    },
    {
      name: 'Mirthful',
      bonusActions: [
        {
          name: feyStepName,
          content: (spellDC) =>
            `${feyStepContentHead} The fey can force one creature it can see within 10 feet of it to make a DC ${spellDC} Wisdom saving throw. Unless the save succeeds, the target is charmed by you and the fey for 1 minute or until the target takes any damage.`,
        },
      ],
    },
    {
      name: 'Tricksy',
      bonusActions: [
        {
          name: feyStepName,
          content: `${feyStepContentHead} The fey can fill a 5-foot cube within 5 feet of it with magical darkness, which lasts until the end of its next turn.`,
        },
      ],
    },
  ],
  modeName: 'Mood',
};

const fiendishSummon: Summon = {
  id: 'fiend',
  name: 'Fiendish Spirit',
  shortName: 'fiend',
  minSpellLevel: 6,
  page: 112,
  size: 'large',
  type: 'fiend',
  baseAC: 12,
  hp: {
    base: 50,
    perLevel: 15,
  },
  speed: { walk: 40 },
  abilityScores: {
    str: 13,
    dex: 16,
    con: 15,
    int: 10,
    wis: 10,
    cha: 16,
  },
  damageResistances: ['fire'],
  damageImmunities: ['poison'],
  conditionImmunities: ['poisoned'],
  languages: ['Abyssal', 'Infernal', 'telepathy 60 ft.'],
  traits: [
    {
      name: 'Magic Resistance',
      content:
        'The fiend has advantage on saving throws against spells and other magical effects.',
    },
  ],
  modes: [
    {
      name: 'Demon',
      hp: { base: 50 },
      speed: { climb: 40 },
      traits: [
        {
          name: 'Death Throes',
          content: (spellDC, spellLevel) =>
            `When the fiend drops to 0 hit points or the spell ends, the fiend explodes, and each creature within 10 feet of it must make a DC ${spellDC} Dexterity saving throw. A creature takes 2d10 + ${spellLevel} fire damage on a failed save, or half as much damage on a successful one.`,
        },
      ],
      attacks: [
        {
          name: 'Bite',
          type: 'melee',
          weapon: 'weapon',
          target: 'target',
          range: 5,
          damage: [
            {
              dice: {
                number: 1,
                size: '12',
              },
              modifier: 3,
              type: 'necrotic',
            },
          ],
        },
      ],
    },
    {
      name: 'Devil',
      hp: { base: 40 },
      speed: { fly: { speed: 60 } },
      traits: [
        {
          name: "Devil's Sight",
          content: "Magical darkness doesn't impede the fiend's darkvision.",
        },
      ],
      attacks: [
        {
          name: 'Hurl Flame',
          type: 'ranged',
          weapon: 'spell',
          target: 'target',
          range: 150,
          damage: [
            {
              dice: {
                number: 2,
                size: '6',
              },
              modifier: 3,
              type: 'fire',
            },
          ],
          additionalText:
            ". If the target is a flammable object that isn't being worn or carried, it also catches fire",
        },
      ],
    },
    {
      name: 'Yugoloth',
      hp: { base: 60 },
      attacks: [
        {
          name: 'Claw',
          type: 'melee',
          weapon: 'weapon',
          target: 'target',
          range: 5,
          damage: [
            {
              dice: {
                number: 1,
                size: '8',
              },
              modifier: 3,
              type: 'slashing',
            },
          ],
          additionalText:
            '. Immediately after the attack hits or misses, the fiend can magically teleport up to 30 feet to an unoccupied space it can see',
        },
      ],
    },
  ],
};

const shadowSummon: Summon = {
  id: 'monstrosity',
  name: 'Shadow Spirit',
  shortName: 'spirit',
  spellName: 'shadowspawn',
  minSpellLevel: 3,
  page: 114,
  size: 'medium',
  type: 'monstrosity',
  baseAC: 11,
  hp: {
    base: 35,
    perLevel: 15,
  },
  speed: { walk: 40 },
  abilityScores: {
    str: 13,
    dex: 16,
    con: 15,
    int: 4,
    wis: 10,
    cha: 16,
  },
  damageResistances: ['necrotic'],
  conditionImmunities: ['frightened'],
  darkvision: 120,
  languages: [understandsLanguages],
  attacks: [
    {
      name: 'Chilling Rend',
      type: 'melee',
      weapon: 'weapon',
      target: 'target',
      range: 5,
      damage: [
        {
          dice: {
            number: 1,
            size: '12',
          },
          modifier: 3,
          type: 'cold',
        },
      ],
    },
  ],
  actions: [
    {
      name: 'Dreadful Scream (1/Day)',
      content: (spellDC) =>
        `The spirit screams. Each creature within 30 feet of it must succeed on a DC ${spellDC} Wisdom saving throw or be frightened for 1 minute. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.`,
    },
  ],
  modes: [
    {
      name: 'Fury',
      traits: [
        {
          name: 'Terror Frenzy',
          content:
            'The spirit has advantage on attack rolls against frightened creatures.',
        },
      ],
    },
    {
      name: 'Despair',
      traits: [
        {
          name: 'Weight of Sorrow',
          content:
            "Any creature, other than you, that starts its turn within 5 feet of the spirit has its speed reduced by 20 feet until the start of that creature's next turn.",
        },
      ],
    },
    {
      name: 'Fear',
      bonusActions: [
        {
          name: 'Shadow Stealth',
          content:
            'While in dim light or darkness, the spirit takes the Hide action.',
        },
      ],
    },
  ],
  modeName: 'emotion',
};

const undeadSummon: Summon = {
  id: 'undead',
  name: 'Undead Spirit',
  shortName: 'spirit',
  minSpellLevel: 3,
  page: 114,
  size: 'medium',
  type: 'undead',
  baseAC: 11,
  hp: {
    base: 30,
    perLevel: 10,
  },
  speed: { walk: 30 },
  abilityScores: {
    str: 12,
    dex: 16,
    con: 15,
    int: 4,
    wis: 10,
    cha: 9,
  },
  damageImmunities: ['necrotic', 'poison'],
  conditionImmunities: ['exhaustion', 'frightened', 'paralyzed', 'poisoned'],
  languages: [understandsLanguages],
  modes: [
    {
      name: 'Ghostly',
      speed: { fly: { speed: 40, hover: true } },
      traits: [
        {
          name: 'Incorporeal Passage',
          content:
            'The spirit can move through other creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it is shunted to the nearest unoccupied space and takes 1d10 force damage for every 5 feet traveled.',
        },
      ],
      attacks: [
        {
          name: 'Deathly Touch',
          type: 'melee',
          weapon: 'weapon',
          target: 'creature',
          range: 5,
          damage: [
            {
              dice: {
                number: 1,
                size: '8',
              },
              modifier: 3,
              type: 'necrotic',
            },
          ],
          additionalText: (spellDC) =>
            `, and the creature must succeed on a DC ${spellDC} Wisdom saving throw or be frightened of the undead until the end of the target's next turn`,
        },
      ],
    },
    {
      name: 'Putrid',
      traits: [
        {
          name: 'Festering Aura',
          content: (spellDC) =>
            `Any creature, other than you, that starts its turn within 5 feet of the spirit must succeed on a DC ${spellDC} Constitution saving throw or be poisoned until the start of its next turn.`,
        },
      ],
      attacks: [
        {
          name: 'Rotting Claw',
          type: 'melee',
          weapon: 'weapon',
          target: 'target',
          range: 5,
          damage: [
            {
              dice: {
                number: 1,
                size: '6',
              },
              modifier: 3,
              type: 'slashing',
            },
          ],
          additionalText: (spellDC) =>
            `. If the target is poisoned, it must succeed on a DC ${spellDC} Constitution saving throw or be paralyzed until the end of its next turn`,
        },
      ],
    },
    {
      name: 'Skeletal',
      hp: { base: 20 },
      attacks: [
        {
          name: 'Grave Bolt',
          type: 'ranged',
          weapon: 'spell',
          target: 'target',
          range: 150,
          damage: [
            {
              dice: {
                number: 2,
                size: '4',
              },
              modifier: 3,
              type: 'necrotic',
            },
          ],
        },
      ],
    },
  ],
};

const dragonSummon: Summon = {
  id: 'dragon',
  name: 'Draconic Spirit',
  shortName: 'dragon',
  spellName: 'Draconic',
  minSpellLevel: 5,
  page: 21,
  size: 'large',
  type: 'dragon',
  baseAC: 14,
  hp: {
    base: 50,
    perLevel: 10,
  },
  speed: {
    walk: 30,
    fly: { speed: 80 },
    swim: 30,
  },
  abilityScores: {
    str: 19,
    dex: 14,
    con: 17,
    int: 10,
    wis: 14,
    cha: 14,
  },
  conditionImmunities: ['charmed', 'frightened', 'poisoned'],
  blindsight: 30,
  languages: ['Draconic', understandsLanguages],
  traits: [
    {
      name: 'Shared Resistances',
      content:
        'When you summon the dragon, choose one of its damage resistances. You have resistance to the chosen damage type until the spell ends.',
    },
  ],
  multiattack: (_, spellLevel) =>
    `The dragon makes ${toWords(
      Math.floor(spellLevel / 2)
    )} Rend attacks and uses its Breath Weapon.`,
  attacks: [
    {
      name: 'Rend',
      type: 'melee',
      weapon: 'weapon',
      range: 10,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '6',
          },
          modifier: 4,
          type: 'piercing',
        },
      ],
    },
  ],
  actions: [
    {
      name: 'Breath Weapon',
      content: (spellDC) =>
        `The dragon exhales destructive energy in a 30-foot cone. Each creature in that area must make a DC ${spellDC} Dexterity saving throw. A creature takes 2d6 damage of a type this dragon has resistance to (your choice) on a failed save, or half as much damage on a successful one.`,
    },
  ],
  modes: [
    {
      name: 'Chromatic',
      damageResistances: ['acid', 'cold', 'fire', 'lightning', 'poison'],
    },
    {
      name: 'Gem',
      damageResistances: ['force', 'necrotic', 'psychic', 'radiant', 'thunder'],
    },
    {
      name: 'Metallic',
      damageResistances: ['acid', 'cold', 'fire', 'lightning', 'poison'],
    },
  ],
  modeName: 'Family',
  sourceName: "Fizban's Treasury of Dragons",
};

export const defaultSummons: Summon[] = sortByName([
  aberrantSummon,
  beastSummon,
  celestialSummon,
  constructSummon,
  dragonSummon,
  elementalSummon,
  feySummon,
  fiendishSummon,
  shadowSummon,
  undeadSummon,
]);

// UA

const dragonSummonUA: SummonUA = {
  id: 'dragon-ua',
  name: 'Draconic Spirit',
  shortName: 'dragon',
  spellName: 'Draconic',
  minSpellLevel: 5,
  page: 7,
  size: 'large',
  type: 'dragon',
  baseAC: 14,
  hp: {
    base: 50,
    perLevel: 10,
  },
  speed: {
    walk: 30,
    fly: { speed: 80 },
    swim: 30,
  },
  abilityScores: {
    str: 19,
    dex: 14,
    con: 17,
    int: 10,
    wis: 14,
    cha: 14,
  },
  conditionImmunities: ['charmed', 'frightened', 'poisoned'],
  blindsight: 30,
  languages: ['Draconic', understandsLanguages],
  traits: [
    {
      name: 'Shared Resistances',
      content:
        'When you summon the dragon, choose one of its damage resistances. You have resistance to the chosen damage type until the spell ends.',
    },
  ],
  multiattack: (_, spellLevel) =>
    `The dragon uses its Breath Weapon, and makes ${toWords(
      Math.floor(spellLevel / 2)
    )} Bite and Claw attacks.`,
  attacks: [
    {
      name: 'Bite and Claw',
      type: 'melee',
      weapon: 'weapon',
      range: 10,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '6',
          },
          modifier: 4,
          type: 'piercing',
        },
      ],
    },
  ],
  actions: [
    {
      name: 'Breath Weapon',
      content:
        'The dragon exhales a stream of multicolored energy in a 30-foot cone. Each creature in that area must make a Dexterity saving throw, taking 2d6 damage of your choice of a damage type this dragon has resistance to on a failed save, or half as much damage on a successful one.',
    },
  ],
  modes: [
    {
      name: 'Chromatic',
      damageResistances: ['acid', 'cold', 'fire', 'lightning', 'poison'],
    },
    {
      name: 'Gem',
      damageResistances: ['force', 'necrotic', 'psychic', 'radiant', 'thunder'],
    },
    {
      name: 'Metallic',
      damageResistances: ['acid', 'cold', 'fire', 'lightning', 'poison'],
    },
  ],
  modeName: 'Family',
  sourceName: 'Unearthed Arcana 2021: Draconic Options',
  isUA: true,
};

const deathSummonUA: SummonUA = {
  id: 'reaper-ua',
  name: 'Reaper Spirit',
  shortName: 'reaper',
  spellName: 'Death',
  minSpellLevel: 4,
  page: 11,
  size: 'medium',
  type: 'undead',
  baseAC: 11,
  hp: {
    base: 40,
    perLevel: 10,
  },
  speed: {
    walk: 30,
    fly: { speed: 30, hover: true },
  },
  abilityScores: {
    str: 16,
    dex: 16,
    con: 16,
    int: 16,
    wis: 16,
    cha: 16,
  },
  damageImmunities: ['necrotic', 'poison'],
  conditionImmunities: ['charmed', 'frightened', 'paralyzed', 'poisoned'],
  darkvision: 60,
  languages: [understandsLanguages],
  traits: [
    {
      name: 'Incorporeal Movement',
      content:
        'The reaper can move through other creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it is shunted to the nearest unoccupied space and takes 1d10 force damage for every 5 feet traveled.',
    },
    {
      name: 'Haunting Tracker',
      content:
        "You and the reaper can sense the direction and distance to the haunted creature if it's on the same plane of existence as you.",
    },
  ],
  attacks: [
    {
      name: 'Reaping Scythe',
      type: 'melee',
      weapon: 'weapon',
      range: 5,
      target: 'target',
      damage: [
        {
          dice: {
            number: 1,
            size: '10',
          },
          modifier: 3,
          type: 'necrotic',
        },
      ],
    },
  ],
  sourceName: 'Unearthed Arcana 2022: Wonders of the Multiverse',
  isUA: true,
};

const warriorSummonUA: SummonUA = {
  id: 'warrior-ua',
  name: 'Warrior Spirit',
  shortName: 'warrior',
  spellName: 'Warrior',
  minSpellLevel: 3,
  page: 11,
  size: 'medium',
  type: 'undead',
  baseAC: 13,
  hp: {
    base: 30,
    perLevel: 10,
  },
  speed: {
    walk: 30,
  },
  abilityScores: {
    str: 16,
    dex: 16,
    con: 14,
    int: 10,
    wis: 16,
    cha: 9,
  },
  damageResistances: ['poison'],
  conditionImmunities: ['charmed', 'poisoned'],
  languages: ['Common', understandsLanguages],
  modeName: 'type',
  modes: [
    {
      name: 'Barbarian',
      attacks: [
        {
          name: 'Reckless Strike',
          type: 'melee',
          weapon: 'weapon',
          advantage: true,
          range: 5,
          target: 'target',
          damage: [
            {
              dice: {
                number: 1,
                size: '12',
              },
              modifier: 3,
              type: 'slashing',
            },
          ],
          additionalText:
            ', and attacks made against the warrior until the start of its next turn are made with advantage',
        },
      ],
    },
    {
      name: 'Fighter',
      baseAC: 15,
      attacks: [
        {
          name: 'Rallying Strike',
          type: 'melee or ranged',
          weapon: 'weapon',
          range: '5 ft., or range 20/60',
          target: 'target',
          damage: [
            {
              dice: {
                number: 1,
                size: '6',
              },
              modifier: 3,
              type: 'piercing',
            },
          ],
          additionalText:
            ', and the warrior can choose another creature it can see within 20 feet of itself. The chosen creature gains 1d6 temporary hit points',
        },
      ],
    },
    {
      name: 'Monk',
      hp: {
        base: 20,
      },
      speed: {
        walk: 40,
      },
      attacks: [
        {
          name: 'Unarmed Strike',
          type: 'melee',
          weapon: 'weapon',
          range: 5,
          target: 'target',
          damage: [
            {
              dice: {
                number: 1,
                size: '4',
              },
              modifier: 3,
              type: 'bludgeoning',
            },
          ],
          additionalText: (spellDC) =>
            `, and the target must succeed on a DC ${spellDC} Strength saving throw or be knocked prone`,
        },
      ],
      bonusActions: [
        {
          name: 'Flurry of Blows',
          content: 'The warrior makes one Unarmed Strike attack.',
        },
      ],
    },
  ],
  sourceName: 'Unearthed Arcana 2022: Wonders of the Multiverse',
  isUA: true,
};

export const uaSummons: Summon[] = sortByName([
  dragonSummonUA,
  deathSummonUA,
  warriorSummonUA,
]);
