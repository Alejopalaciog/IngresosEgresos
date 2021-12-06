import React from "react";
import { FormControl, InputGroup, Navbar } from "react-bootstrap";

const Header = ({ mvtList, title, balance, updateInitialBalance }) => {
  const handleInitialBalanceChange = (e) => {
    updateInitialBalance(e.target.value);
  };

  return (
    <React.Fragment>
      <Navbar bg="blue" variant="info">
        <Navbar.Brand href="#home">
          <img
            alt="" width="30" height="30" className="d-inline-block align-top"
            src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-income-line-icon-vector-png-image_5073033.jpg"                 
            
         />{" "}
          {title}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end, px-5"> 
          <Navbar.Text>Saldo inicial:{` `}</Navbar.Text>
          <InputGroup className="px-4">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              value={balance.initialBalance}
              onChange={handleInitialBalanceChange}
            />
          </InputGroup>
          <Navbar.Text>Saldo Final:{` `}</Navbar.Text>
          <InputGroup className="px-4">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              readOnly="readOnly"
              value={balance.finalBalance}
            />
          </InputGroup>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </React.Fragment>
  );
};

export default Header;
