import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Button } from "reactstrap";
import { getAppliances } from "../graphql";
import { useQuery } from "@apollo/client";
import Header from "./Header";
import FilterToolbar from "./FilterToolbar";
import color from "../utils/getColor";

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  padding: 16px 25px;
  color: rgba(45, 53, 64, 1);
  font-weight: 500;
  font-size: 1.75rem;
`;

const StyledBody = styled.div`
  padding: 1.5rem;
`;

const TableWrapper = styled.div`
  max-width: 100vw;
  overflow: auto;

  thead {
    border-bottom: 1px solid #d9d2d2;
  }

  .text-primary {
    color: rgba(8, 71, 130, 1) !important;
  }

  thead {
    font-size: 0.875rem;
  }
  tbody,
  tbody button {
    font-size: 0.75rem;
    font-weight: 500;
  }
  td,
  th {
    padding: 1rem;
  }

  tbody > tr {
    vertical-align: top;
    &:hover {
      background-color: whitesmoke;
    }
  }
`;

const DeviceList = () => {
  const { data } = useQuery(getAppliances);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [devices, setDevices] = useState(data?.appliances || []);

  useEffect(() => {
    setDevices(data?.appliances);
  }, [data?.appliances]);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToShow = devices?.slice?.(startIndex, endIndex);

  const handlePageChange = (pageNum) => {
    setActivePage(pageNum);
  };

  const changeItemsPerPage = (e) => {
    setActivePage(1);
    setItemsPerPage(parseInt(e.target.value));
  };

  const handleSearch = () => {
    const filteredItems = (data?.appliances || []).filter((device) =>
      device.theatreName.toLowerCase().includes(searchText.toLowerCase())
    );
    setDevices(filteredItems);
  };

  if (!data) return "Loading...";

  return (
    <>
      <StyledHeader>Devices</StyledHeader>
      <StyledBody>
        <Header />
        <Card className="mt-3">
          <FilterToolbar
            searchText={searchText}
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            totolCount={devices.length || 0}
            handlePageChange={handlePageChange}
            changeItemsPerPage={changeItemsPerPage}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
          <TableWrapper>
            <table className="w-100 text-capitalize">
              <thead>
                <tr>
                  <th>Device Serial</th>
                  <th>Location</th>
                  <th>Bandwidth</th>
                  <th>Status</th>
                  <th>Download Status</th>
                  <th>OS Version</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemsToShow.map((device) => (
                  <tr key={device.serialNo}>
                    <td>{device.serialNo}</td>
                    <td>
                      <div> {device.theatreName} </div>
                      <div className="text-primary">
                        {device.location.city}, {device.location.state},{" "}
                        {device.location.country}
                      </div>
                    </td>
                    <td>{device.bandwidth}</td>
                    <td className="">
                      <span
                        className={`status-circle me-1 ${
                          color[device.deviceStatus]
                        }`}
                      ></span>{" "}
                      <span>{device.deviceStatus}</span>
                    </td>
                    <td className={`text-capitalize`}>
                      <span
                        className={`status-circle me-1 ${
                          color[device.downloadStatus]
                        }`}
                      ></span>{" "}
                      <span>
                        {device.downloadStatus !== "succeeded"
                          ? device.downloadStatus
                          : "Downloaded"}
                      </span>
                    </td>
                    <td>{device.osVersion}</td>
                    <td>
                      <Link
                        className="text-light text-decoration-none d-inline-block"
                        to={`/devices/${device.serialNo}`}
                      >
                        <Button color="light"> View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </Card>
      </StyledBody>
    </>
  );
};

export default DeviceList;
