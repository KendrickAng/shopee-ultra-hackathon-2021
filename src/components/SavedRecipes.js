import React, { Component } from 'react';
import { List,Card, Row,Col} from 'antd';
import { SET_TITLE } from '../helpers/constants';
import store from '../helpers/store';
import recipe from '../data/recipes.json';
import {UnorderedListOutlined} from '@ant-design/icons';
import FittedImage from 'react-fitted-image';





class SavedRecipes extends Component {
  constructor(props) {
    super(props);
    store.dispatch({
      type: SET_TITLE,
      payload: "Saved Recipes"
    })
  }

  render() {
    return (
      <List
      grid={{
        gutter: 8,
        column: 1,
      }}
        dataSource={recipe}
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
                console.log('Hello');
                }}>
              <p>
                <b>
              {recipe.title}
              </b>
              </p>             
              </Card>
              </Col>

              <Col span={2}>
             
              <UnorderedListOutlined style={iconStyle} 
              onClick={() => {
                console.log('Hello');
                }}>
                  </UnorderedListOutlined>
      
              
              </Col>
            </Row>

          </List.Item>

          
        )}
      />
    );
  }
}
const rowStyle ={
  height: "150px"
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
  shape: "cicle",
  background: '#ee4d2d',
  fontSize: '200%',
  margin: '10px',
  border: '0px solid black',
  padding: '10px',
  alignment: 'center',
  bordered: "true",
  borderColor: "black",
  hoverable: "true",
};
export default SavedRecipes;
