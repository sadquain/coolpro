import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchGateway } from "../redux/actions/Users";
import { useLocation } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
  Modal,
  Spinner,
} from "react-bootstrap";
import ChartistGraph from "react-chartist";

function Gateway(props) {
  const [tempList, setTempList] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Initial display count
  const [loading, setLoading] = useState(true); // Track loading state

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const params = useLocation();
  const macAddressProp =
    params && params.state ? params.state : { macAddress: null };

  const macAddress = macAddressProp && macAddressProp.state;

  useEffect(() => {
    // Fetch initial data
    fetchGatewayData();
  }, [startDate, endDate]);

  const fetchGatewayData = () => {
    props.fetchGateway(macAddress).then((res) => {
      setTempList(res);
      setLoading(false); // Set loading to false when data is received
    });
  };

  const handleLoadMore = () => {
    // Increment display count by 40
    setDisplayCount(displayCount + 10);
  };

  useEffect(() => {
    // Update chart data whenever tempList changes
    updateChartData();
  }, [displayCount, tempList]);

  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const [chartTempData, setTempChartData] = useState({
    labels: [],
    series: [],
  });

  const updateChartData = () => {
    const filteredData = tempList.filter(
      (data) =>
        moment(data.time).isSameOrAfter(startDate, "day") &&
        moment(data.time).isSameOrBefore(endDate, "day")
    );

    console.log("filteredData", filteredData);

    const labels = filteredData.map((data) =>
      moment(data.time).format("DD-MM-YYYY")
    );
    const series = [filteredData.map((data) => data.humidity.toFixed(2))];
    const seriesTemp = [
      filteredData.map((data) => data.temperature.toFixed(2)),
    ];
    setChartData({ labels, series });
    setTempChartData({ labels, series: seriesTemp });
  };

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [showTemp, setTempShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function handleTempShow(breakpoint) {
    setFullscreen(breakpoint);
    setTempShow(true);
  }

  return (
    <>
      {loading ? ( // Check if loading, show loading indicator if true
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <>
          <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
            Humidity Chart
          </Button>
          <Modal show={show} size="xl" onHide={() => setShow(false)}>
            <Modal.Body>
              {" "}
              <div className="ct-chart" id="chartHours">
                <ChartistGraph
                  data={chartData}
                  type="Line"
                  options={{
                    low: 0,
                    high: 70,

                    showArea: false,
                    height: "215px",
                    axisX: {
                      showGrid: true,
                      labelOffset: {
                        x: 0,
                        y: -9, // Adjust the value according to your preference
                      },
                    },

                    showLine: true,
                    showPoint: true,
                    fullWidth: false,

                    chartPadding: {
                      right: 50,
                    },
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </div>
            </Modal.Body>
          </Modal>
          <Button className="me-2 mb-2" onClick={() => handleTempShow(true)}>
            Temperature Chart
          </Button>
          <Modal show={showTemp} size="xl" onHide={() => setTempShow(false)}>
            <Modal.Body>
              {" "}
              <div className="ct-chart" id="chartHours">
                <ChartistGraph
                  data={chartTempData}
                  type="Line"
                  options={{
                    low: 0,
                    high: 30,

                    showArea: false,
                    height: "215px",
                    axisX: {
                      showGrid: true,
                      labelOffset: {
                        x: 0,
                        y: -9, // Adjust the value according to your preference
                      },
                    },

                    showLine: true,
                    showPoint: true,
                    fullWidth: false,

                    chartPadding: {
                      right: 50,
                    },
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </div>
            </Modal.Body>
          </Modal>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select start date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select end date"
          />
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="strpied-tabled-with-hover">
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Humidity</th>
                          <th className="border-0">Temperature</th>
                          <th className="border-0">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempList &&
                          tempList.length > 0 &&
                          tempList.slice(0, displayCount).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{data.humidity.toFixed(2)}</td>
                                <td>{data.temperature.toFixed(2)}</td>
                                <td>
                                  {moment(data.time).format("DD-MM-YYYY HH:mm")}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                    {tempList && tempList.length > displayCount && (
                      <button onClick={handleLoadMore}>Load More</button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default connect(null, { fetchGateway })(Gateway);
