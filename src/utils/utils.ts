import { IVerb, Lang } from "../types.ts";

export const getRandomVerbsOrder = (numVerbs: number): number[] => {
  const verbsOrder: number[] = [];
  let cnt = 0;
  while (cnt < numVerbs) {
    let verbIdInt;
    do {
      verbIdInt = Math.floor(Math.random() * numVerbs);
    } while (verbsOrder.includes(verbIdInt));
    verbsOrder.push(verbIdInt);
    cnt++;
  }
  return verbsOrder;
};

export const getSortedVerbsOrder = (verbs: IVerb[]): number[] => {
  const verbsCopy = structuredClone(verbs).sort((a: IVerb, b: IVerb) => {
    let nameA = a.nameRo[0];
    if (nameA.indexOf("(se) ") !== -1) {
      nameA = nameA.slice("(se) ".length);
    } else if (nameA.indexOf("se ") !== -1) {
      nameA = nameA.slice("se ".length);
    }
    let nameB = b.nameRo[0];
    if (nameB.indexOf("(se) ") !== -1) {
      nameB = nameB.slice("(se) ".length);
    } else if (nameB.indexOf("se ") !== -1) {
      nameB = nameB.slice("se ".length);
    }
    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  });
  return verbsCopy.map((verb: IVerb) => verb.id);
};

export const searchVerbs = (
  verbs: IVerb[],
  searchString: string
): [IVerb[], lang: Lang | null] => {
  let searchResultsRo: IVerb[] = [];
  let searchResultsRu: IVerb[] = [];
  if (searchString.length > 1) {
    searchResultsRo = verbs.filter((item: IVerb) =>
      item.nameRo[0].includes(searchString.toLowerCase())
    );
    searchResultsRu = verbs.filter((item: IVerb) =>
      item.nameRu.includes(searchString.toLowerCase())
    );
    const searchResults = searchResultsRo.length
      ? searchResultsRo
      : searchResultsRu;
    const searchLang = searchResultsRo.length ? Lang.ro : Lang.ru;
    //setSearchLang(searchLang);
    return [searchResults, searchLang];
  } else if (searchString.length === 1) {
    verbs.forEach((item: IVerb) => {
      const regExp = new RegExp(`^${searchString.toLowerCase()}`);
      const itemToMatch = // "(se) verb" or "se verb"==> "verb"
        item.nameRo[0].split(" ").length > 1
          ? item.nameRo[0].split(" ")[1]
          : item.nameRo[0];
      const matchesRo = itemToMatch.match(regExp);
      if (matchesRo) {
        searchResultsRo.push(item);
      }
      const matchesRu = item.nameRu.match(regExp);
      if (matchesRu) {
        searchResultsRu.push(item);
      }
    });
    const searchResults = searchResultsRo.length
      ? searchResultsRo.sort((a: IVerb, b: IVerb) => {
          return a.nameRo[0] > b.nameRo[0]
            ? 1
            : a.nameRo[0] < b.nameRo[0]
            ? -1
            : 0;
        })
      : searchResultsRu.sort((a: IVerb, b: IVerb) => {
          return a.nameRu > b.nameRu ? 1 : a.nameRu < b.nameRu ? -1 : 0;
        });
    const searchLang = searchResultsRo.length ? Lang.ro : Lang.ru;
    return [searchResults, searchLang];
  } else {
    return [[], null];
  }
};

export const getVerbByIdx = (
  verbs: IVerb[],
  idx: number
): IVerb | undefined => {
  const foundVerb = verbs.find((verb) => verb.id === idx);
  return foundVerb;
};
