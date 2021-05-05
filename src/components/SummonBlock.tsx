import * as React from 'react';
import { calcMod, sortByName, toTitleCase } from '../utils';
import { toWords } from 'number-to-words';
import style from '../scss/summonBlock.scss';

const renderAbilityScoreMod = (score: number, index: number) => {
    return (
        <td key={'abilityScore' + index}>
            {score} ({calcMod(score) >= 0 ? '+' + calcMod(score) : calcMod(score)})
        </td>
    );
};

const renderInfoList = (title: string, listToRender: string[] | undefined) => {
    if (!listToRender || !listToRender.length) {
        return <React.Fragment />;
    }
    return (
        <div className={style.statList}>
            <span className={style.statName}>{title}</span>{' '}
            {listToRender.sort().map((item, index) => (
                <React.Fragment key={`${title}${index}`}>
                    {item}
                    {index < listToRender.length - 1 ? ', ' : ''}
                </React.Fragment>
            ))}
        </div>
    );
};

const renderSpeed = (speed: Speed) => {
    return (
        <span>
            {speed.walk} ft.
            {speed.burrow ? `, burrow ${speed.burrow} ft.` : ''}
            {speed.climb ? `, climb ${speed.climb} ft.` : ''}
            {speed.fly ? `, fly ${speed.fly.speed} ft.${speed.fly.hover ? ' (hover)' : ''}` : ''}
            {speed.swim ? `, swim ${speed.swim} ft.` : ''}
        </span>
    );
};

const renderContent = (title: string, spellLevel: SpellLevel, spellDC: number) => (feature: Content, index: number) => {
    const featureContent = typeof feature.content === 'function' ? feature.content(spellDC, spellLevel) : feature.content;
    return (
        <div className={style.feature} key={`${title}Feature${index}`}>
            <span className={style.featureName}>{feature.name}.</span> {featureContent}
        </div>
    );
};

const renderFeatureBlock = (title: string, contents: Content[] | undefined, spellLevel: SpellLevel, spellDC: number) => {
    if (!contents || !contents.length) {
        return <React.Fragment />;
    }
    contents = sortByName(contents);
    return (
        <>
            <div className={style.sectionDivider}>{toTitleCase(title)}</div>
            {contents.map(renderContent(title, spellLevel, spellDC))}
        </>
    );
};

const renderDmg = (damage: Damage[], spellLevel: SpellLevel) => (
    <span>
        {damage.map((dmg, index) => (
            <React.Fragment key={'damage' + index}>
                {index >= 1 ? ' + ' : ''}
                <span className={style.damageDice}>
                    {dmg.dice.number}d{dmg.dice.size}
                    {dmg.modifier ? ' + ' + (dmg.modifier + spellLevel) : ''} {dmg.type} damage
                </span>
            </React.Fragment>
        ))}
    </span>
);

const mergeModeIntoSummon = (summonIn: Summon, summonMode: SummonMode): Summon => {
    const summon: Summon = {
        ...summonIn,
        ...summonMode,
        name: summonIn.name,
        hp: { ...summonIn.hp, ...summonMode.hp },
        speed: { ...summonIn.speed, ...summonMode.speed },
        damageResistances: [...(summonIn.damageResistances || []), ...(summonMode.damageResistances || [])],
        damageImmunities: [...(summonIn.damageImmunities || []), ...(summonMode.damageImmunities || [])],
        conditionImmunities: [...(summonIn.conditionImmunities || []), ...(summonMode.conditionImmunities || [])],
        traits: [...(summonIn.traits || []), ...(summonMode.traits || [])],
        attacks: [...(summonIn.attacks || []), ...(summonMode.attacks || [])],
        actions: [...(summonIn.actions || []), ...(summonMode.actions || [])],
        bonusActions: [...(summonIn.bonusActions || []), ...(summonMode.bonusActions || [])],
        reactions: [...(summonIn.reactions || []), ...(summonMode.reactions || [])],
    };
    return summon;
};

export interface SummonBlockProps {
    summon: Summon;
    summonMode: SummonMode;
    spellLevel: number;
    spellAttack: number;
    spellDC: number;
}

export const SummonBlock: React.FC<SummonBlockProps> = ({ summon: summonIn, summonMode, spellLevel, spellAttack, spellDC }) => {
    const summon = mergeModeIntoSummon(summonIn, summonMode);
    return (
        <div className={style.summonBlock}>
            <div className={style.summonName}>
                {summon.name} ({summonMode.name})
            </div>
            <div className={style.typeLine}>
                {toTitleCase(summon.size)} {summon.type}
            </div>
            <div className={style.sectionDivider}></div>
            <div className={style.statList}>
                <span className={style.statName}>Armor Class</span> {summon.baseAC + spellLevel} (natural armor)
            </div>
            <div className={style.statList}>
                <span className={style.statName}>Hit Points</span> {summon.hp.base + (spellLevel - summon.minSpellLevel) * summon.hp.perLevel}
            </div>
            <div className={style.statList}>
                <span className={style.statName}>Speed</span> {renderSpeed(summon.speed)}
            </div>
            <div className={style.sectionDivider}></div>
            <div>
                <table className={style.abilityScoreTable}>
                    <thead>
                        <tr>
                            <th>STR</th>
                            <th>DEX</th>
                            <th>CON</th>
                            <th>INT</th>
                            <th>WIS</th>
                            <th>CHA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>{Object.values(summon.abilityScores).map((abilityScore, index) => renderAbilityScoreMod(abilityScore, index))}</tr>
                    </tbody>
                </table>
            </div>
            <div className={style.sectionDivider}></div>
            {renderInfoList('Damage Resistances', summon.damageResistances)}
            {renderInfoList('Damage Immunities', summon.damageImmunities)}
            {renderInfoList('Condition Immunities', summon.conditionImmunities)}
            <div className={style.statList}>
                <span className={style.statName}>Senses</span> darkvision {summon.darkvisionDistance || '60'} ft., passive Perception {10 + calcMod(summon.abilityScores.wis)}
            </div>
            {renderInfoList('Languages', summon.languages)}
            {renderFeatureBlock('Traits', summon.traits, spellLevel, spellDC)}
            <div className={style.sectionDivider}>Actions</div>
            {spellLevel >= 4 ? (
                <div className={style.feature}>
                    <span className={style.featureName}>Multiattack.</span> The {summon.shortName} makes {toWords(Math.floor(spellLevel / 2))} attacks.
                </div>
            ) : (
                <React.Fragment />
            )}
            {(summon.attacks || []).map((attack, index) => (
                <div className={style.feature} key={'attack' + index}>
                    <span className={style.featureName}>{attack.name}.</span>{' '}
                    <span className={style.attackType}>
                        {toTitleCase(attack.type)} {toTitleCase(attack.weapon)} Attack
                    </span>
                    : +{spellAttack} to hit, {attack.type === 'ranged' ? 'range' : 'reach'} {attack.range} ft., one {attack.target}. <span className={style.hit}>Hit: </span>
                    {renderDmg(attack.damage, spellLevel)}
                    {typeof attack.additionalText === 'function' ? attack.additionalText(spellDC, spellLevel) : attack.additionalText}.
                </div>
            ))}
            {(summon.actions || []).map(renderContent('actions', spellLevel, spellDC))}
            {renderFeatureBlock('Bonus Actions', summon.bonusActions, spellLevel, spellDC)}
            {renderFeatureBlock('Reactions', summon.reactions, spellLevel, spellDC)}
        </div>
    );
};
