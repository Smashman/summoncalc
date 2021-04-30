import * as React from 'react';
import { allSummons } from '../data';
import { SummonBlock, SummonBlockProps } from './SummonBlock';
import { Header } from './Header';
import * as style from '../scss/style.scss';
import { Options, OptionsProps } from './Options';

export const App: React.FC = () => {
    const [spellAttack, setSpellAttack] = React.useState(5);
    const [spellDC, setSpellDC] = React.useState(13);
    const [summon, setSummon] = React.useState(allSummons[0]);
    const [summonMode, setSummonMode] = React.useState(summon.modes[0]);
    const [spellLevel, setSpellLevel] = React.useState(summon.minSpellLevel);

    const loadNumberFromStorage = (storageKey: string, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const storedVariable = Number(localStorage.getItem(storageKey));

        if (storedVariable) {
            setter(storedVariable);
        }
    };

    React.useLayoutEffect(() => {
        loadNumberFromStorage('spellAttack', setSpellAttack);
        loadNumberFromStorage('spellDC', setSpellDC);
        loadNumberFromStorage('spellLevel', setSpellLevel);

        const storedSummonName = localStorage.getItem('summon');
        const selectedSummon = allSummons.find((summon) => summon.name === storedSummonName);
        if (selectedSummon) {
            setSummon(selectedSummon);

            const storedModeName = localStorage.getItem('mode');
            const selectedMode = selectedSummon.modes.find((mode) => mode.name === storedModeName);
            if (selectedMode) {
                setSummonMode(selectedMode);
            }
        }
    }, []);

    const optionsProps: OptionsProps = {
        spellAttack,
        spellDC,
        spellLevel,
        summon,
        summonMode,
        setSpellAttack,
        setSpellDC,
        setSpellLevel,
        setSummon,
        setSummonMode,
    };

    const summonProps: SummonBlockProps = {
        summon,
        summonMode,
        spellLevel,
        spellAttack,
        spellDC,
    };

    return (
        <React.Fragment>
            <Header />
            <main className={style.app}>
                <SummonBlock {...summonProps} />
                <Options {...optionsProps} />
            </main>
        </React.Fragment>
    );
};
