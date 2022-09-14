import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const res = await fetch("https://raw.githubusercontent.com/cederdorff/mdu-frontend/main/data/posts.json");
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }

        getPosts();
    }, []);

    function createPost(event) {
        event.preventDefault();
        console.log(event.target);
        const title = event.target.title.value;
        const body = event.target.body.value;
        const image = event.target.image.value;

        const id = Date.now();
        const newPost = {
            title: title,
            body: body,
            image: image,
            id: id
        };

        setPosts([newPost, ...posts]);
    }

    return (
        <>
            <header className="topbar">
                <h1>React Post App</h1>
            </header>
            <main className="page">
                <form onSubmit={createPost}>
                    <input type="text" placeholder="Title" name="title" />
                    <input type="text" placeholder="Body" name="body" />
                    <input type="url" placeholder="Image url" name="image" />
                    <button>Save</button>
                </form>
                <section className="grid-container">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </section>
            </main>
        </>
    );
}

export default App;
