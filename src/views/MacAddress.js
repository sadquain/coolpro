import React, { useState } from "react";
import { connect } from "react-redux";
import { registeredDevices } from "../redux/actions/Users";
import { withRouter } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function MacAddress(props) {
  const [mac, setMacList] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const uidProp =
    props.location && props.location.state
      ? props.location.state
      : { uid: null };

  const uid = uidProp && uidProp.state;

  React.useEffect(() => {
    props.registeredDevices(uid).then((res) => {
      setMacList(res);
      setLoading(false); // Set loading to false when data is received
    });
  }, []);

  const handleMac = (macAddress) => {
    props.history.push("/admin/gateway", { state: macAddress });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                {loading ? ( // Check if loading, show loading indicator if true
                  <Spinner animation="border" role="status"></Spinner>
                ) : (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Mac Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mac &&
                        mac.length > 0 &&
                        mac.map((data, index) => {
                          return (
                            <tr onClick={() => handleMac(data)} style={{ cursor: "pointer" }} key={index}>
                              <td>{data}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, { registeredDevices })(withRouter(MacAddress));
