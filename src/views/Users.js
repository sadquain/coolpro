import React, { useState } from "react";
import { connect } from "react-redux";
import { list } from "../redux/actions/Users";
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from "react-router-dom";
// react-bootstrap components
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
} from "react-bootstrap";

function Users(props) {
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  React.useEffect(() => {
    props.list().then((res) => {
      setUserList(res);
      setLoading(false); // Set loading to false when data is received
    });
  }, []);

  const handleUser = (uid) => {
    props.history.push("/admin/macaddress", { state: uid });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              {/* <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header> */}
              <Card.Body className="table-full-width table-responsive px-0">
                {loading ? ( // Check if loading, show loading indicator if true
                  <Spinner animation="border" role="status">
                </Spinner>
                ) : (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList &&
                        userList.length > 0 &&
                        userList.map((data, index) => {
                          return (
                            <tr
                              onClick={() => handleUser(data.uid)}
                              style={{ cursor: "pointer" }}
                              key={index}
                            >
                              <td>{data.email}</td>
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

export default connect(null, { list })(withRouter(Users));
