import { API_KEY, SHEET_ID, SHEET_BASEURL, SHEETS_NAME } from "../config.json";
import React from "react";
import axios from "axios";


const sheetName = SHEETS_NAME.teachers_info;
const range = "A2:E35";
const url = `${SHEET_BASEURL}/${SHEET_ID}/values/${sheetName}!${range}?key=${API_KEY}`;


class TeachersInfoView extends React.Component {

    state = { sheetData: [], ready: false };

    fetchData = () => {
        axios.get(url)
            .then(data => {
                var cleanData = data.data.values.filter(x => !!x);
                this.setState({ sheetData: cleanData, ready: true });
            }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        const { sheetData, ready } = this.state;

        if (ready) {
            return (
                <React.Fragment>
                    <div className="container">
                        <div className="vertical-padding"></div>
                        <div className="vertical-padding"></div>
                        <h2><i className="bi bi-person-lines-fill"></i> Teachers' Info</h2>
                        <div className="vertical-padding"></div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Course</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Teacher</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sheetData.map((each, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><b>{each[0]}</b></td>
                                                <td><i>{each[1]}</i></td>
                                                <td>{each[2]}</td>
                                                <td>{each[3]}</td>
                                                <td>{each[4]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
        return null;
    }

}


export default TeachersInfoView;