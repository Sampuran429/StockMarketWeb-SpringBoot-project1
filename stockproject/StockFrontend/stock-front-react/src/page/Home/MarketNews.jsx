// src/page/Home/MarketNews.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MarketNewsComponent = () => {
//     const [news, setNews] = useState([]);

//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8081/marketnews');
//                 setNews(response.data);
//             } catch (error) {
//                 console.error('Error fetching market news:', error);
//             }
//         };
//         fetchNews();
//     }, []);

//     return (
//         <div>
//             <h1>Market News</h1>
//             <ul>
//                 {news.map((item) => (
//                     <li key={item.id}>
//                         <h2>{item.headline}</h2>
//                         <img src={item.image} alt={item.headline} />
//                         <p>{item.summary}</p>
//                         <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MarketNewsComponent;



import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketNews } from '@/State/MarketNews/Action';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MarketNews = () => {
    const dispatch = useDispatch();
    const { marketNews, loading, error } = useSelector(state => state.marketnews); // Correct selector

    useEffect(() => {
        dispatch(fetchMarketNews()); // Fetch market news when the component mounts
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!Array.isArray(marketNews) || marketNews.length === 0) {
        return <div>No market news available at the moment.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Market News</h2>
            <div className="flex flex-wrap -mx-4">
                {marketNews.map((newsItem) => (
                    <div key={newsItem.id} className="w-full md:w-1/2 px-4 mb-4">
                        <Card className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    {newsItem.headline}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <p className="text-sm-orange-600">Source: {newsItem.source}</p>
                                <p className="mt-2 text-pink-200">
                                    {newsItem.summary}
                                </p>
                                <p className="mt-2 text-sm">
                                    For more, visit:{" "}
                                    <a
                                        href={newsItem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {newsItem.source}
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketNews;
