import React from 'react';
import TinderCard from 'react-tinder-card';

// Recipe database
const recipes = [
    {
        id: '1',
        img: '/img/food1.jpg',
        text: {
            title: 'Chicken rice',
            steps: ['Place rice in cooker', 'Done!'],
        },
        ingredients: ['chicken', 'rice'],
    },
    {
        id: '2',
        img: '/img/food2.jpg',
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
            {recipes.map((recipe, idx) => {
                return (
                    <TinderCard className='swipe'
                                key={recipe.id}
                                onSwipe={(dir) => console.log(`Swiped ${dir}`)}
                                onCardLeftScreen={() => console.log('Card left screen!')}
                    >
                        <div style={{
                            backgroundImage: 'url(' + recipe.img + ')',
                            width: 500,
                            height: 500,
                        }} className='card'>
                            <h3>{recipe.text.title}</h3>
                        </div>
                    </TinderCard>
                )
            })}
            <div className='buttons'>
                <button onClick={() => console.log('Swiped current card left!')}>Swipe Left!</button>
                <button onClick={() => console.log('Swiped current card right!')}>Swipe Right!</button>
            </div>
        </>
    )
}

export { Swipe };
