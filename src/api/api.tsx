import { IData } from '../types';

export const sortDesc = (list: IData[]): IData[] => list.sort((a: IData, b: IData) => b.population - a.population);

export const sortAsc = (list: IData[]): IData[] => list.sort((a: IData, b: IData) => a.population - b.population);

export const filterList = (fullList: IData[], searchTerm: any, radioSelect: string): IData[] => {
    return fullList.filter((item: any) => {
        const term = typeof searchTerm === 'number' ? searchTerm.toString() : searchTerm.toLowerCase();
        const word = typeof item[radioSelect] === 'number' ? item[radioSelect].toString() : item[radioSelect].toLowerCase();
        
        return word.includes(term);
    });
};
