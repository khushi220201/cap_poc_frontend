import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Input, Row, Table } from "antd";
import "./App.css";
import { useDebounce } from "use-debounce";


function App() {
  const BASE_PATH = process.env.REACT_APP_API_ENDPOINT;

  const [employeeData, setEmployeeData] = useState();
    const [searchText, setSearchText] = useState("");
    const [debouncedSearchText] = useDebounce(searchText, 1000);


  console.log("employeeData: ", employeeData);

  const getAllEmployees = async () => {
    try {
       const query: any = {
        
       };

       if (debouncedSearchText) {
         query.search = debouncedSearchText;
       }

      const res = await axios.get(`${BASE_PATH}/employees`, {
        params: query,
      });
      if (res.data.data) {
        setEmployeeData(res.data.data);
      }
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.errorDescription) {
        errorMessage = error.errorDescription;
      }
      console.log("errorMessage: ", errorMessage);
    }
  };

  useEffect(() => {
    getAllEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <div>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "90%",
              marginTop:'20px'
            }}
          >
            <div>
              <Input
                size="large"
                placeholder="Search by Name, Email"
                // value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  width: "250px",
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <div style={{ width: "80%", margin: "0 auto" }}>
            <Table
              pagination={false}
              dataSource={employeeData}
              rowKey={(data: any) => data.id}
              columns={[
                {
                  title: "Employee Name",
                  dataIndex: "fullName",
                  key: "name",
                  width: "30%",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                  key: "email",
                  width: "40%",
                },
                {
                  title: "Phone",
                  dataIndex: "phone",
                  key: "phone",
                  width: "30%",
                  render: (text: any) => {
                    return text ? <p>{text}</p> : "-";
                  },
                },
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
