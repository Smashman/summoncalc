import * as React from 'react';
import style from '../scss/options.scss';
import { maxSpellAttack, maxSpellLevel, maxSpellDC, minSpellAttack, minSpellDC, toTitleCase, spellAttackId, spellLevelId, spellDCId } from '../utils';
import { allSummons } from '../data';
import { NumberInput } from './NumberInput';

export interface OptionsProps {
    spellAttack: number;
    spellDC: number;
    spellLevel: number;
    summon: Summon;
    summonMode: SummonMode;

    setSpellAttack: React.Dispatch<React.SetStateAction<number>>;
    setSpellDC: React.Dispatch<React.SetStateAction<number>>;
    setSpellLevel: React.Dispatch<React.SetStateAction<number>>;
    setSummon: React.Dispatch<React.SetStateAction<Summon>>;
    setSummonMode: React.Dispatch<React.SetStateAction<SummonMode>>;
}

export const Options: React.FC<OptionsProps> = ({ spellAttack, spellDC, spellLevel, summon, summonMode, setSpellAttack, setSpellDC, setSpellLevel, setSummon, setSummonMode }) => {
    const handleSummonChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedSummon = allSummons[e.target.selectedIndex];
        const firstMode = selectedSummon.modes[0];
        setSummon(selectedSummon);
        setSummonMode(firstMode);
        setSpellLevel(selectedSummon.minSpellLevel);
        localStorage.setItem('summon', selectedSummon.name);
        localStorage.setItem('mode', firstMode.name);
        localStorage.setItem(spellLevelId, selectedSummon.minSpellLevel.toString());
    };

    const handleModeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedMode = summon.modes[e.target.selectedIndex];
        setSummonMode(selectedMode);
        localStorage.setItem('mode', selectedMode.name);
    };

    const spellLevelFormatter = (spellLevel: number) => {
        switch (spellLevel) {
            case 2:
                return `${spellLevel}nd`;
            case 3:
                return `${spellLevel}rd`;
            default:
                return `${spellLevel}th`;
        }
    };
    return (
        <div className={style.options}>
            <div className={style.optionRow}>
                <div>
                    <label htmlFor={spellAttackId}>Spell Attack Modifier: </label>
                    <NumberInput inputId={spellAttackId} min={minSpellAttack} max={maxSpellAttack} value={spellAttack} size={3} setter={setSpellAttack} formatter={(num) => `+${num}`} disabled />
                </div>
                <div>
                    <label htmlFor={spellDCId}>Spell Save DC: </label>
                    <NumberInput inputId={spellDCId} min={minSpellDC} max={maxSpellDC} value={spellDC} setter={setSpellDC} disabled />
                </div>
            </div>
            <div className={style.optionRow}>
                <div>
                    <label htmlFor="summon-select">Summon: </label>
                    <select id="summon-select" value={summon.name} onChange={handleSummonChange}>
                        {allSummons.map((summon, index) => (
                            <option value={summon.name} key={'summon' + index}>
                                {summon.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="mode-select">{toTitleCase(summon.modeName || 'Form')}: </label>
                    <select id="mode-select" value={summonMode.name} onChange={handleModeChange}>
                        {summon.modes.map((mode, index) => (
                            <option value={mode.name} key={'mode' + index}>
                                {mode.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={style.optionRow}>
                <div>
                    <label htmlFor={spellLevelId}>Spell Level: </label>
                    <NumberInput inputId={spellLevelId} min={summon.minSpellLevel} max={maxSpellLevel} value={spellLevel} setter={setSpellLevel} formatter={spellLevelFormatter} size={3} disabled />
                </div>
            </div>
        </div>
    );
};
