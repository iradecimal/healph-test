import React from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./dailyintaketable.css";

import { FaTrophy } from "react-icons/fa";

const LeaderboardsTable = ({ data }) => {
  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  return (
    <div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table bordered hover style={{ borderColor: "#9FC856" }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>HALE</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "black" }}>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Rank: ${index + 1}`)}
                  >
                    <div>
                      {index === 0 ? (
                        <span
                          className="trophy-icon gold"
                          style={{ color: "#FFD700" }}
                        >
                          <FaTrophy /> 1
                        </span>
                      ) : index === 1 ? (
                        <span
                          className="trophy-icon silver"
                          style={{ color: "#C0C0C0" }}
                        >
                          <FaTrophy /> 2
                        </span>
                      ) : index === 2 ? (
                        <span
                          className="trophy-icon bronze"
                          style={{ color: "#CD7F32" }}
                        >
                          <FaTrophy /> 3
                        </span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Name: ${item.user.map(
                        (userData) =>
                          `${userData.fname} ${userData.mi} ${userData.lname} ${userData.suffix}`
                      )}`
                    )}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: index <= 2 ? 600 : "normal",
                          color:
                            index === 0
                              ? "#FFD700"
                              : index === 1
                              ? "#C0C0C0"
                              : index === 2
                              ? "#CD7F32"
                              : "inherit",
                        }}
                      >
                        {item.user.map(
                          (userData) =>
                            `${userData.fname} ${userData.mi} ${userData.lname} ${userData.suffix}`
                        )}
                      </span>
                    </div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`HALE: ${item.hale}`)}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: index <= 2 ? 600 : "normal",
                          color:
                            index === 0
                              ? "#FFD700"
                              : index === 1
                              ? "#C0C0C0"
                              : index === 2
                              ? "#CD7F32"
                              : "inherit",
                        }}
                      >
                        {item.hale}
                      </span>
                    </div>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardsTable;
