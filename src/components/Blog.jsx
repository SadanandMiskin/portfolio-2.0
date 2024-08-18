import  { useEffect, useState } from "react";
import '../assets/Blog.css'
 const Blog = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@miskinsadanand')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => console.log(err));
    }, []);

        if(posts == null){
            return (
               <div className="loading">
                 <h2>Loading....</h2>
               </div>
            )
        }
    return (
        <div className="n">
            <div className="content">
            

            {posts && posts.items && posts.items.map((item) => {
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
                                <p> {posts.feed.title}</p>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
        </div>
    );
};
export default Blog