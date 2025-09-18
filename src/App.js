import './App.scss';
import { useState } from 'react';

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //候補
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems([...items, {
      amount: "0",
      price: "0",
    }]);
  };
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };


  //構築
  return (
    <Container>
      <html lang="ja" translate="no">
        <div className="title">
          <h1>価格(計算).com</h1>
        </div>
        <div>
          {
            items.map((item, index) => (
              <div className='item-block'>
                <div key={index} className="item-row">
                  <Form.Control
                    type="number"
                    placeholder="量"
                    value={item.amount}
                    onChange={
                      e => updateItem(index, "amount", e.target.value)
                    }
                    min="0"
                  />
                  <span>[ g | ml ] で</span>
                  <Form.Control
                    type = "number"
                    placeholder="価格"
                    value={item.price}
                    onChange={
                      e => updateItem(index, "price", e.target.value)
                    }
                    min="0"
                  />
                  <span>円の商品</span>
                </div>
                <div>
                  <div>
                    1[ g | ml ]当たり{item.amount > 0 ? item.price / item.amount : "NaN"} 円
                  </div>
                  <div>
                    1円当たり{item.price > 0 ? item.amount / item.price : "NaN"} [ g | ml ]
                  </div>
                </div>
              </div>
            ))
          }
          <Button onClick={addItem}>
            New Entry
          </Button>
        </div>
      </html>
    </Container>
  );
}

export default App;
