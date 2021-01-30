import React from 'react';
import TinderCard from 'react-tinder-card';

// Recipe database
const recipes = [
    {
        id: '1',
        image: '/img/food1.jpg',
        text: {
            title: 'Chicken rice',
            steps: ['Place rice in cooker', 'Done!'],
        },
        ingredients: ['chicken', 'rice'],
    },
    {
        id: '2',
        image: '/img/food2.jpg',
        text: {
            title: 'Duck rice',
            steps: ['Hunt duck', 'Cook rice', 'Done!'],
        },
        ingredients: ['duck', 'rice'],
    }
]

const Swipe = () => {
    return (
        <>
            {recipes.map(recipe => {
                return <div>hello</div>
            })}
        </>
    )
}

export { Swipe };
