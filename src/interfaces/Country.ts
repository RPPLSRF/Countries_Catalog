export interface Country {
  flags: img;
  name:  Name;
  cca2:  string;
  cca3:  string;
  altSpellings: string[];
  idd: Idd;
}
export interface img {
  png: string;
  svg: string;
}
export interface Name {
  common:      string;
  official:    string;
  nativeName: NativeName;
}
export interface NativeLanguage {
  official: string;
  common:   string;
}
export interface Idd {
  root:     string;
  suffixes: string[];
}
export interface NativeName {
  ara: NativeLanguage;
  fra: NativeLanguage;
  eng: NativeLanguage;
  prs: NativeLanguage;
  spa: NativeLanguage;
  afr: NativeLanguage;
  bul: NativeLanguage;
  amh: NativeLanguage;
  lav: NativeLanguage;
  nno: NativeLanguage;
  fas: NativeLanguage;
  ben: NativeLanguage;
  bos: NativeLanguage;
  kir: NativeLanguage;
  por: NativeLanguage;
  sqi: NativeLanguage;
  ell: NativeLanguage;
  nld: NativeLanguage;
  lit: NativeLanguage;
  ind: NativeLanguage;
  aym: NativeLanguage;
  dan: NativeLanguage;
  kaz: NativeLanguage;
  bwg: NativeLanguage;
  grn: NativeLanguage;
  mya: NativeLanguage;
  fin: NativeLanguage;
  rus: NativeLanguage;
  khm: NativeLanguage;
  hrv: NativeLanguage;
  slk: NativeLanguage;
  est: NativeLanguage;
  ita: NativeLanguage;
  kal: NativeLanguage;
  nor: NativeLanguage;
  vie: NativeLanguage;
  cha: NativeLanguage;
  kor: NativeLanguage;
  cal: NativeLanguage;
  deu: NativeLanguage;
  ces: NativeLanguage;
  tur: NativeLanguage;
  aze: NativeLanguage;
  sin: NativeLanguage;
  div: NativeLanguage;
  crs: NativeLanguage;
  ber: NativeLanguage;
  ron: NativeLanguage;
  jpn: NativeLanguage;
  hye: NativeLanguage;
  bel: NativeLanguage;
  nep: NativeLanguage;
  pol: NativeLanguage;
  bjz: NativeLanguage;
  slv: NativeLanguage;
  ukr: NativeLanguage;
  lao: NativeLanguage;
  swe: NativeLanguage;
  mon: NativeLanguage;
  hun: NativeLanguage;
  dzo: NativeLanguage;
  msa: NativeLanguage;
  kat: NativeLanguage;
  srp: NativeLanguage;
  zho: NativeLanguage;
  cat: NativeLanguage;
  cnr: NativeLanguage;
  tha: NativeLanguage;
  isl: NativeLanguage;
  bis: NativeLanguage;
  mkd: NativeLanguage;    
  bar: NativeLanguage;  
}

