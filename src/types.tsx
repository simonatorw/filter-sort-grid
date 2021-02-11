import { Dispatch, SetStateAction } from "react";

export interface IData {
  name: string;
  alpha2Code: string;
  population: number;
  capital: string;
  languages: ILanguage[];
  currencies: ICurrency[];
}
  
interface ILanguage {
  name: string;
}
  
interface ICurrency {
  name: string;
}

export interface IDetails {
  title: string;
  capital: string;
  language: string;
  currency: string;
}

export interface IDetailsProps {
  details: IDetails;
  setIsPage: Dispatch<SetStateAction<boolean>>;
}