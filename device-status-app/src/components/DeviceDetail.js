import React from "react";
import styled from "styled-components";
import { Card, Row, Col, Button, Badge } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getAppliance } from "../graphql";
import speedIcon from "../assets/speed.svg";
import logIcon from "../assets/logs.svg";
import storageIcon from "../assets/storage.svg";
import color from "../utils/getColor";

const BreadCrumb = styled.div`
  min-height: 48px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  .serial-number {
    // font-size: 0.65rem;
    // vertical-align: middle;
  }
`;

const StyledBadges = styled.div`
  --bs-secondary-rgb: 230, 236, 240;
`;

const displayValues = [
  {
    text: "Device Serial",
    key: "serialNo",
  },
  {
    text: "Location",
    key: "theatreName",
  },
  {
    text: "City",
    key: "",
  },
  {
    text: "ISP Payment Responsibility",
    key: "ispPaymentResponsibility",
  },
  {
    text: "Bandwidth",
    key: "bandwidth",
  },
  {
    text: "Average Bandwidth",
    key: "avgBandwidth",
  },
  {
    text: "Plan Start Date",
    key: "planStartDate",
  },
  {
    text: "Billing Cycle",
    key: "billingCycle",
  },
  {
    text: "Download Status",
    key: "downloadStatus",
  },
  {
    text: "OS Version",
    key: "osVersion",
  },
  {
    text: "Storage Available",
    key: "storage",
  },
];

const DeviceHeader = ({ device }) => {
  return (
    <Card className="px-4 py-2" style={{ fontSize: "0.875rem" }}>
      <Row className="g-0">
        <Col xs="auto" style={{ fontSize: "1.75rem" }}>
          {device.serialNo}
        </Col>
        <Col xs="auto" className="ms-auto d-flex gap-3">
          <Button color="light">
            <img src={speedIcon} alt="icons" className="me-2" />
            Speedtest
          </Button>
          <Button color="light">
            <img src={logIcon} alt="icons" className="me-2" />
            Logs
          </Button>
        </Col>
      </Row>
      <Row className="g-0 mt-1">
        <Col>
          <div>{device.theatreName}</div>
          <div className="text-secondary">
            {device.location.city}, {device.location.state},{" "}
            {device.location.country}
          </div>
          <StyledBadges className="mt-1">
            <Badge className="me-2 text-dark py-1 px-2" pill>
              <span
                className={`status-circle me-2 ${color[device.deviceStatus]}`}
              ></span>
              <span>{device.deviceStatus} </span>
            </Badge>
            <Badge pill className="text-dark py-1 px-2">
              <img src={storageIcon} alt="storage icon" className="me-2" />
              828GB
            </Badge>
          </StyledBadges>
        </Col>
      </Row>
      <hr />
      <Row className="g-0 gap-3 text-secondary">
        <Col xs="auto" className="py-1 px-1">
          Details
        </Col>
        <Col xs="auto" className="py-1 px-1">
          Content
        </Col>
        <Col xs="auto" className="py-1 px-1">
          Bandwidth
        </Col>
      </Row>
    </Card>
  );
};

const DeviceContents = ({ device }) => {
  return (
    <Card className="m-4 px-4 py-2" style={{ fontSize: "0.75rem" }}>
      <Row className="g-0 gy-3">
        {displayValues.map((value) => {
          return (
            <Col xs="12" sm="6" md="4" lg="3" className="py-1 px-1">
              <div style={{ fontSize: "0.75rem" }}>{value.text}</div>
              <div>{device[value.key] || "-"}</div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

const DeviceDetail = () => {
  const { id } = useParams();

  const { data } = useQuery(getAppliance, {
    variables: {
      applianceId: id,
    },
  });
  const device = data?.appliance || {};

  if (!device) return <div>Loading...</div>;

  return (
    <div>
      <BreadCrumb>
        <Link to="/" className="text-decoration-none">
          {" "}
          <span className="text-secondary">Devices</span>
        </Link>
        <span className="mx-1"> &gt;</span>
        <span className="serial-number">{device.serialNo}</span>
      </BreadCrumb>

      <DeviceHeader device={device} />

      <DeviceContents device={device} />
    </div>
  );
};

export default DeviceDetail;
