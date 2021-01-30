import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TinderCard from './common/ReactTinderCard';
import { Container } from './common/Container';
import {Card, Button, Typography, Space, List, Modal, Row, Col} from 'antd';
import { HeartTwoTone, CloseCircleTwoTone, FilterTwoTone } from '@ant-design/icons';
import './Swipe.css';
import {DIR} from "../../helpers/Swipe";
import {SET_TITLE} from "../../helpers/constants";
import recipesDb from '../../data/recipes.json';
import store from '../../helpers/store';
import {FilterButton} from "./common/FilterButton";

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
        height: '70vh',
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
    },
    btn: {
        height: 80,
        width: 80,
    },
    btnIcon: {
        fontSize: '45px',
        marginTop: 3,
    }
}

const Swipe = () => {
    const [filters, setFilters] = useState({});
    const [isFiltersOpen, setFiltersOpen] = useState(false);
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
                {recipes.filter(r => !filters[r.category]).map((recipe, idx) => {
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
                                    description={
                                        <List>
                                            {recipe.steps.split('\n').map(str => <List.Item>{str}</List.Item>)}
                                        </List>
                                    }
                                />
                            </Card>
                        </TinderCard>
                    )
                })}
            </div>
            <Space style={styles.btnRow} align="center">
                <Button icon={<CloseCircleTwoTone style={styles.btnIcon}/>}
                        style={styles.btn}
                        shape="circle"
                        size="large"
                        onClick={() => swipe(DIR.LEFT)}/>
                <Button icon={<FilterTwoTone style={styles.btnIcon} twoToneColor="#a1a1a1"/>}
                        style={styles.btn}
                        shape="circle"
                        size="large"
                        onClick={() => setFiltersOpen(!isFiltersOpen)}/>
                <Button icon={<HeartTwoTone style={styles.btnIcon} twoToneColor="#eb2f96"/>}
                        style={styles.btn}
                        shape="circle"
                        size="large"
                        onClick={() => swipe(DIR.RIGHT)}/>
            </Space>
            <Paragraph>
                {lastChoice}
            </Paragraph>

            {/*Modal*/}
            <Modal
                visible={isFiltersOpen}
                onOk={() => setFiltersOpen(false)}
                onCancel={() => setFiltersOpen(false)}
                title="Title"
            >
                <Row>
                    {[...new Set(recipes.map(r => r.category))].map((category) => {
                        return <Col span={12}>
                            <FilterButton category={category} filters={filters} setFilters={setFilters} />
                        </Col>
                    })}
                </Row>
            </Modal>
        </Container>
    )
}

export { Swipe };
