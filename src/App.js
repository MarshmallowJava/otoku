import './App.scss';
import { useState } from 'react';

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";

function App() {

  //候補
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems([...items, {
      amount: "0",
      price: "0",
    }]);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  //表示単位
  const [unit, setUnit] = useState("個");

  //構築
  return (
    <Container>
      <div className="title">
        <h1>価格(計算).com</h1>
        <h5>毎日をお得に過ごそう</h5>
      </div>


      <div className="settings">
        <h7>単位設定</h7>
        <Form.Select onChange={e => setUnit(e.target.value)}>
          <option>個</option>
          <option>グラム</option>
          <option>mL</option>
        </Form.Select>
      </div>


      <div>
        {
          items.map((item, index) => (
            <div className='item-block'>
              <div key={index} className="item-row">
                {
                  <InputGroup>
                    <Form.Control
                      type="number"
                      min="0"
                      value={item.amount}
                      onChange={e => updateItem(index, "amount", e.target.value)}
                    >
                    </Form.Control>
                    <InputGroup.Text>{unit}</InputGroup.Text>
                    <Form.Control
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={e => updateItem(index, "price", e.target.value)}
                    >
                    </Form.Control>
                    <InputGroup.Text>円</InputGroup.Text>
                  </InputGroup>
                }
              </div>

              {
                (parseInt(item.amount) > 0 && parseInt(item.price) > 0) ? (
                  <div>
                    <Row>
                      <Col>1{unit}につき</Col>
                      <Col>
                        {(item.price / item.amount).toFixed(2)}
                      </Col>
                      <Col>円する</Col>
                    </Row>
                    <Row>
                      <Col>1円につき</Col>
                      <Col>
                        {(item.amount / item.price).toFixed(2)}
                      </Col>
                      <Col>{unit}買える</Col>
                    </Row>
                  </div>
                ) : (
                  <span>情報が十分ではありません</span>
                )
              }
              <div className="delete">
                <Button variant="danger" size="sm" onClick={e => removeItem(index)}>
                  削除
                </Button>
              </div>
            </div>
          ))
        }

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={addItem}>
            候補を追加
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default App;
