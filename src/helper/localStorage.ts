export function getLocalData(key: string) {
  const data = localStorage.getItem(key);

  if (!data) return;

  return JSON.parse(data);
}

export function setLocalData(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function pushData(key: string, value: any) {
  const currData = localStorage.getItem(key);

  if (!currData) {
    const newData = [value];
    setLocalData(key, newData);

    return;
  }

  const newData = [value, ...JSON.parse(currData)];
  setLocalData(key, newData);

  return newData;
}

export function removeData(key: string, id: string) {
  const currData = localStorage.getItem(key);

  if (!currData) return;

  const newData = [...JSON.parse(currData)].filter((data) => data.id != id);
  setLocalData(key, newData);

  return newData;
}
