import { useEffect, useState, useCallback } from "react";
import '../assets/Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const [isFetched, setIsFetched] = useState(false);

    const fetchPosts = useCallback(() => {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40miskinsadanand&api_key=ae3bqxuc5zegwuv5zzdhkf7coq72fsejixwthlcr')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsFetched(true);
            })
            .catch((err) => {
                setErr(err);
                console.log('Error:', err);
            });
    }, []);

    useEffect(() => {
        if (!isFetched) {
            fetchPosts(); 
        }
    }, [isFetched, fetchPosts]); 

    if (err) {
        return (
            <div className="loading">
                <h2>There was an Error..</h2>
                {/* <p>{err.message}</p> */}
            </div>
        );
    }
    
    if (!posts) {
        return (
            <div className="loading">
                <h2>Loading....</h2>
            </div>
        );
    }
       
    return (
        <div className="n">
            <div className="content">
                {posts.items && posts.items.map((item) => {
                    const htmlString = item.description;
                    const regex = /<img [^>]*src="([^"]*)"[^>]*>/;
                    const match = htmlString.match(regex);
                    const imgSrc = match ? match[1] : null;

                    return (
                        <a href={item.link} key={item.guid} target="_blank" rel="noopener noreferrer">
                            <div className="card">
                                {imgSrc && <img src={imgSrc} alt={item.title} loading="lazy" />}
                                <div className="content">
                                    <h1>{item.title}</h1>
                                    <p>{posts.feed.title}</p>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default Blog;
