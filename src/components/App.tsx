import * as React from 'react';
import { allSummons } from '../data';
import { maxSpellAttack, maxSpellLevel, maxSpellDC, minSpellAttack, minSpellDC, toTitleCase } from '../utils';
import { SummonBlock, SummonBlockProps } from './SummonBlock';
import * as style from '../scss/style.scss';

export const App: React.FC = () => {
    const [spellAttack, setSpellAttack] = React.useState(5);
    const [spellDC, setSpellDC] = React.useState(13);
    const [summon, setSummon] = React.useState(allSummons[0]);
    const [summonMode, setMode] = React.useState(summon.modes[0]);
    const [spellLevel, setSpellLevel] = React.useState(summon.minSpellLevel);

    const handleSummonChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedSummon = allSummons[e.target.selectedIndex];
        setSummon(selectedSummon);
        setMode(selectedSummon.modes[0]);
        setSpellLevel(selectedSummon.minSpellLevel);
    };

    const handleModeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedMode = summon.modes[e.target.selectedIndex];
        setMode(selectedMode);
    };

    const numberInputConstrainer = (min: number, max: number, setter: React.Dispatch<React.SetStateAction<number>>): React.ChangeEventHandler<HTMLInputElement> => (e) => {
        let number = Number(e.target.value);
        if (isNaN(number) || number < min) {
            number = min;
        } else if (number > max) {
            number = max;
        }
        setter(number);
    };

    const summonProps: SummonBlockProps = {
        summon,
        summonMode,
        spellLevel,
        spellAttack,
        spellDC,
    };

    return (
        <div className={style.app}>
            <div>
                <div>
                    Spell Attack Modifier: <input type="number" min={minSpellAttack} max={maxSpellAttack} value={spellAttack} onChange={numberInputConstrainer(minSpellAttack, maxSpellAttack, setSpellAttack)} />
                </div>
                <div>
                    Spell Save DC: <input type="number" min={minSpellDC} max={maxSpellDC} value={spellDC} onChange={numberInputConstrainer(minSpellDC, maxSpellDC, setSpellDC)} />
                </div>
            </div>
            <div>
                <div>
                    Summon:{' '}
                    <select value={summon.name} onChange={handleSummonChange}>
                        {allSummons.map((summon, index) => (
                            <option value={summon.name} key={'summon' + index}>
                                {summon.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {toTitleCase(summon.modeName || 'Form')}:{' '}
                    <select value={summonMode.name} onChange={handleModeChange}>
                        {summon.modes.map((mode, index) => (
                            <option value={mode.name} key={'mode' + index}>
                                {mode.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                Spell Level: <input type="number" min={summon.minSpellLevel} max={maxSpellLevel} value={spellLevel} onChange={numberInputConstrainer(summon.minSpellLevel, maxSpellLevel, setSpellLevel)} />
            </div>
            <SummonBlock {...summonProps} />
        </div>
    );
};
