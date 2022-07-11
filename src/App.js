import Posts from "./Posts.js";
import AddPost from "./AddPost.js";

function App() {
  return (
    <main className="app">
      <h1 className="app-header">Posts</h1>
      <AddPost />
      <Posts />
    </main>
  );
}

export default App;
