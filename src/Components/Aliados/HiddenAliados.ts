// src/Components/Aliados/HiddenAliados.ts
const STORAGE_KEY = "hiddenAliados";

export const getHiddenAliados = (): string[] => {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const hideAliado = (id: string) => {
  const hidden = getHiddenAliados();
  if (!hidden.includes(id)) {
    hidden.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hidden));
  }
};
