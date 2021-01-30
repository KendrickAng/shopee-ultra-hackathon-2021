import React, { Component } from 'react';
import { List,Card, Row,Col} from 'antd';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';
import recipe from '../data/recipes.json';
import {UnorderedListOutlined, DeleteOutlined} from '@ant-design/icons';
import FittedImage from 'react-fitted-image';
import FloatingAddRecipes from './FloatingAddRecipes';
import {getDisliked, getLiked, setDisliked, setLiked} from "../helpers/localStorage";

class SavedRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dislikedId: [],
      likedId: []
    }
    store.dispatch({
      type: SET_TITLE,
      payload: "Saved Recipes"
    })
    this.state.dislikedId = getDisliked();
    this.state.likedId = getLiked();
  }

  render() {
    const likedRecipes = recipe.filter((x) => this.state.likedId.includes(x.id));

    if (likedRecipes.length == 0) {
      return (
        <div>
          <p>No recipes yet, press the "+" button below to start browsing!</p>
          <FloatingAddRecipes />
        </div>
      );
    }

    return (
      <div>
        <List
        grid={{
          gutter: 8,
          column: 1,
        }}
          dataSource={likedRecipes}
          renderItem={recipe => (
            <List.Item>
              <Row style={rowStyle}>
                <Col span={8} style={colStyle}>
                  <FittedImage
                    fit="cover"
                    style = {imageStyle}
                    src={recipe.image}
                  />
                </Col>

                <Col span={14} style={colStyle}>
                  <Card style={titleStyle}  hoverable={true}
                  onClick={() => {
                    this.props.history.push('/view/' + recipe.id);
                    }}>
                    <b>
                      {recipe.title}
                    </b>
                  </Card>
                </Col>

                <Col span={2}>
                  <Row style={rowStyleHalf}>
                    <UnorderedListOutlined style={iconStyle}
                      onClick={() => {
                        this.props.history.push('/shop/' + recipe.id);
                        }} />
                  </Row>
                  <Row style={rowStyleHalf}>
                    <DeleteOutlined style={iconStyle}
                      onClick={() => {
                        let newLikes = this.state.likedId;
                        let newDislikes = this.state.dislikedId;
                        newLikes.splice(newLikes.indexOf(recipe.id));
                        newDislikes.push(recipe.id);
                        this.setState({
                          likedId: newLikes,
                          dislikedId: newDislikes
                        });
                        setLiked(newLikes);
                        setDisliked(newDislikes);
                      }} />
                  </Row>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <FloatingAddRecipes />
      </div>
    );
  }
}
const rowStyle ={
  height: "150px"
}
const rowStyleHalf ={
  height: "75px"
}
const colStyle ={
  height: "150px"
}
const titleStyle = {
  width: "100%",
  height: "100%",
  margin: '10px',
  padding: '10px',
  alignment: 'right',
  fontSize: "160%",
  hoverable: "true",
};

const imageStyle = {
  height: "100%",
  width: "100%",
  margin: '10px',
  border: '5px solid pink',
  padding: '5px',
  justify: "end",
  alignment: 'left',
  bordered: "true",
  borderColor: "black",
  hoverable: "true",
};

// const textStyle = {
//   height: "0%",
//   width: "100%",
//   shape: "cicle",
//   background: '#ee4d2d',
//   fontSize: '100%',
//   margin: '10px',
//   border: '0px solid black',
//   padding: '10px',
//   alignment: 'center',
//   bordered: "true",
//   borderColor: "black",
//   hoverable: "true",
// };

const iconStyle = {
  height: "100%",
  width: "100%",
  shape: "circle",
  background: '#ee4d2d',
  fontSize: '180%',
  margin: '10px',
  border: '0px solid white',
  padding: '10px',
  alignment: 'center',
  bordered: "true",
  borderColor: "white",
  color: "white",
  hoverable: "true",
};
export default SavedRecipes;
