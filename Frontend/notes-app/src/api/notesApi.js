export async function getNotes({ page, limit, tags, isArchived, text }) {
  const res = await fetch(
    `http://localhost:3000/api/notes?limit=${limit}&page=${page}&isArchived=${isArchived}&tags=${tags}&search=${text}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const finalData = await res.json();
  return finalData;
}

export async function getTagsList() {
  const res = await fetch(`http://localhost:3000/api/notes/get-tags-list`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}
