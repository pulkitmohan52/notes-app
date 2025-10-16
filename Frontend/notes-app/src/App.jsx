import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebouce";
import { getNotes, getTagsList } from "./api/notesApi";

function App() {
  const LIMIT = 10;
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
    limit: LIMIT,
  });
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const debounceQuery = useDebounce(input);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes({ page: currentPageNumber });
      setItems(notes.data.items);
      setPageInfo(notes.data.pageInfo);
    };
    fetchData();
  }, [currentPageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes({ text: debounceQuery });
      setItems(notes.data.items);
      setPageInfo(notes.data.pageInfo);
    };

    fetchData();
  }, [debounceQuery]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTagsList();
      setTags(tags.data);
    };

    fetchTags();
  }, []);

  const handleSelect = async (e) => {
    const notes = await getNotes({ tags: e.target.value });
    setItems(notes.data.items);
    setPageInfo(notes.data.pageInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <select onChange={(e) => handleSelect(e)}>
            {tags && tags.map((tag) => <option value={tag}>{tag}</option>)}
          </select>
          <div>
            <input
              placeholder="search notes here"
              style={{ width: "600px" }}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <p>Title: {item.title}</p>
              <p>Content: {item.content}</p>
              <p>isArchived: {item.isArchived}</p>
              <p>ID: {item._id}</p>
              <p>
                {item.tags.map((tag) => (
                  <span>{tag}, </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <nav style={{ marginTop: 20 }}>
          {Array.from({ length: pageInfo.totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPageNumber(index + 1)}
              disabled={pageInfo.currentPage === index + 1}
              style={{ marginRight: 8, cursor: "pointer" }}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default App;
