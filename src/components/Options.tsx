import * as React from 'react';
import { maxSpellAttack, maxSpellLevel, maxSpellDC, minSpellAttack, minSpellDC, toTitleCase } from '../utils';
import style from '../scss/options.scss';
import { allSummons } from '../data';

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
        localStorage.setItem('spellLevel', selectedSummon.minSpellLevel.toString());
    };

    const handleModeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedMode = summon.modes[e.target.selectedIndex];
        setSummonMode(selectedMode);
        localStorage.setItem('mode', selectedMode.name);
    };

    const numberInputConstrainer = (min: number, max: number, setter: React.Dispatch<React.SetStateAction<number>>, storageKey: string): React.ChangeEventHandler<HTMLInputElement> => (e) => {
        let number = Number(e.target.value);
        if (isNaN(number) || number < min) {
            number = min;
        } else if (number > max) {
            number = max;
        }
        setter(number);
        localStorage.setItem(storageKey, number.toString());
    };

    const getSpellLevelSuffix = (spellLevel: number) => {
        switch (spellLevel) {
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };
    return (
        <div className={style.options}>
            <div className={style.optionsTitle}>Options</div>
            <div className={style.optionRow}>
                <div>
                    <label htmlFor="spell-attack">Spell Attack Modifier: </label>
                    <span id={style.spellAttackWrapper} className={style.inputWithFormatting}>
                        <input id="spell-attack" type="number" min={minSpellAttack} max={maxSpellAttack} value={spellAttack} onChange={numberInputConstrainer(minSpellAttack, maxSpellAttack, setSpellAttack, 'spellAttack')} />
                    </span>
                </div>
                <div>
                    <label htmlFor="spell-dc">Spell Save DC: </label>
                    <input id="spell-dc" type="number" min={minSpellDC} max={maxSpellDC} value={spellDC} onChange={numberInputConstrainer(minSpellDC, maxSpellDC, setSpellDC, 'spellDC')} />
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
                    <label htmlFor="spell-level">Spell Level: </label>
                    <span id={style.spellLevelWrapper} className={style.inputWithFormatting}>
                        <input id="spell-level" type="number" min={summon.minSpellLevel} max={maxSpellLevel} value={spellLevel} onChange={numberInputConstrainer(summon.minSpellLevel, maxSpellLevel, setSpellLevel, 'spellLevel')} />
                        <span>{getSpellLevelSuffix(spellLevel)}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
