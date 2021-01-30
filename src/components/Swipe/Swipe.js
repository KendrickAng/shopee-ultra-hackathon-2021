import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TinderCard from 'react-tinder-card';
import { Container } from './common/Container';
import { Card, Button, Typography, Space } from 'antd';
import { HeartTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import './Swipe.css';
import {DIR} from "../../helpers/Swipe";
import {SET_TITLE} from "../../helpers/constants";
import recipesDb from '../../data/recipes.json';
import store from '../../helpers/store';

const { Paragraph } = Typography;

// TODO temporary test local storage
const localStorage = {
    selected: [],
    rejected: [],
}

const styles = {
    cardContainer: {
        position: 'relative',
        width: '90vw',
        maxWidth: '500px',
        height: '80vh',
    },
    card: {
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        maxWidth: '500px',
        height: '400px',
    },
    cardBody: {
        maxHeight: '20vh',
        width: '100%',
        overflow: 'auto'
    },
    btnRow: {
        position: 'fixed',
        left: '50%',
        bottom: '20px',
        transform: 'translate(-50%, -50%)',
        margin: '0 auto',
    }
}

const Swipe = () => {
    const [recipes, setRecipes] = useState(recipesDb);
    const [lastChoice, setLastChoice] = useState("");

    // Set navbar title
    useEffect(() => {
        store.dispatch({
            type: SET_TITLE,
            payload: "Recipes"
        })
    }, [])

    const childRefs = useMemo(() => {
        return Array(recipes.length).fill(0).map(i => React.createRef())
    }, []);

    const handleSwipe = (dir, recipe) => {
        switch(dir) {
            case DIR.LEFT:
                localStorage.rejected.push(recipe.id);
                setLastChoice(`Rejected ${recipe.title}`);
                break;
            case DIR.RIGHT:
                localStorage.selected.push(recipe.id);
                setLastChoice(`Saved ${recipe.title}`);
                break;
            default:
                console.log(`Unhandled swipe direction ${dir}`);
        }
        console.log(localStorage)
    };

    const outOfFrame =(rid) => {
        setRecipes(recipes.filter(r => r.id !== rid));
    };

    const swipe = (dir) => {
        const recipesLeft = recipes.filter(r => !localStorage.rejected.includes(r.id));
        if (recipesLeft.length > 0) {
            const recipeToRemove = recipesLeft[recipesLeft.length - 1];
            const idx = recipes.map(r => r.id).indexOf(recipeToRemove.id);
            childRefs[idx].current.swipe(dir);
        }
    };

    return (
        <Container>
                <div style={styles.cardContainer}>
                    {recipes.map((recipe, idx) => {
                        return (
                            <TinderCard ref={childRefs[idx]}
                                        className='swipe'
                                        key={recipe.id}
                                        onSwipe={(dir) => handleSwipe(dir, recipe)}
                                        onCardLeftScreen={() => outOfFrame(recipe.id)}
                            >
                                <Card bodyStyle={styles.cardBody}
                                      cover={
                                          <div style={{...styles.card, backgroundImage: 'url(' + recipe.image + ')'}}/>
                                      }
                                >
                                    <Card.Meta
                                        title={recipe.title}
                                        description="This is the descriptionThis is the descriptionThis is the description is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the description"
                                    />
                                </Card>
                            </TinderCard>
                        )
                    })}
                </div>
                <Space style={styles.btnRow} align="center">
                    <Button icon={<CloseCircleTwoTone/>}
                            shape="circle"
                            size="large"
                            onClick={() => swipe(DIR.LEFT)}/>
                    <Button icon={<HeartTwoTone twoToneColor="#eb2f96"/>}
                            shape="circle"
                            size="large"
                            onClick={() => swipe(DIR.RIGHT)}/>
                </Space>
                <Paragraph>
                    {lastChoice}
                </Paragraph>
        </Container>
    )
}

export { Swipe };
