import { storage } from "@core/utils";

export const toHtml = (key) => {
  const state = storage(key);
  const [excel, id] = key.split(":");
  return `
     <li class="db__record">
        <a href="#${excel}}/${id}">${state.title}</a>
        <strong>${new Date(state.openedDate).toLocaleDateString()}</strong>
     </li>
    `;
};

export const getAllRecords = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++ ) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }

  return keys;
};


export const createRecordsTable = () => {
  const records = getAllRecords();

  if (!records.length) {
    return "<p>Записи отсутствуют</p>";
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    
    <ul class="db__list">
      ${records.map(toHtml).join("")}
    </ul>
`;
};
