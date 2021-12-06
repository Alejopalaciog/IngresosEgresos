import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import MvtForm from "./components/Form";
import MvtList from "./components/List";

const App = () => {
   
  const [mvts, setMvts] = useState([]);
  const [title, setTitle] = useState("APP Contabilidad");

   
  let _searchFilter = "";
  let _typeMvtFilter = "Todos";

   
  const [mvtsFiltered, setMvtsFiltered] = useState([]);

   
  const [balance, setBalance] = useState({
    initialBalance: 0.0,
    totalMvts: 0.0,
    finalBalance: 0.0,
  });

   
  useEffect(() => {
    const total = mvts.reduce(
      (total, mvt) =>
        (total =
          mvt.typeMvt === "Ingreso"
            ? parseFloat(total) + parseFloat(mvt.qty)
            : parseFloat(total) - parseFloat(mvt.qty)),
      0
    );
    setBalance({
      ...balance,
      totalMvts: total,
      finalBalance: parseFloat(balance.initialBalance) + parseFloat(total),
    });

    refreshList();
  }, [mvts]);

  const updateInitialBalance = (initialBalance) => {
    setBalance({
      ...balance,
      initialBalance: parseFloat(initialBalance),
      finalBalance: parseFloat(initialBalance) + parseFloat(balance.totalMvts),
    });
  };

   
  const establishSearchFilter = (searchFilter) => {
    _searchFilter = searchFilter;  
    refreshList();
  };

   
  const establishTypeMvtFilter = (typeMvtFilter) => {
    _typeMvtFilter = typeMvtFilter;  
    refreshList();
  };

   
  const refreshList = () => {
    let filter = mvts.filter(
      (mvt) =>
        mvt.name.toLowerCase().includes(_searchFilter.toLowerCase()) &&  
        (_typeMvtFilter === "Todos" || mvt.typeMvt === _typeMvtFilter)  
    );

    setMvtsFiltered(filter);  
  };

   
  const addMvt = (mvt) => {
    setMvts([...mvts, mvt]);
  };

   
  const removeMvt = (id) => {
    setMvts(mvts.filter((mvt) => mvt.id !== id));
  };

   
  const editMvt = (mvtEdited) => {
    setMvts(
      mvts.map((mvt) => {
        if (mvt.id === mvtEdited.id) {
          return {
            ...mvt,
            typeMvt: mvtEdited.typeMvt,
            name: mvtEdited.name,
            qty: mvtEdited.qty,
          };
        }
        return mvt;
      })
    );
  };

  return (
    <Container fluid={true}>
      <Header
        title={title}
        balance={balance}
        updateInitialBalance={updateInitialBalance}
      />
      <Row>
        <Col xs={5}>
          <MvtForm balance={balance} addMvt={addMvt} />
        </Col>
        <Col xs={6}>
          <MvtList
            balance={balance}
            mvts={mvtsFiltered}
            establishSearchFilter={establishSearchFilter}
            establishTypeMvtFilter={establishTypeMvtFilter}
            removeMvt={removeMvt}
            editMvt={editMvt}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
