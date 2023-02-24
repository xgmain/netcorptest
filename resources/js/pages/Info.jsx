import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import withRouter from '../withRouter';
import BingMapsReact from "bingmaps-react";
import { Link } from "react-router-dom";
  
class Info extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            log: null,
            loading:true,
            error: null
        };
    }
  
    async getLog(){
        await axios
            .get(`/api/v1/agilogs/${this.state.id}/lastInfo`)
            .then( res => {
                this.setState(() => ({
                    loading:false, 
                    log: res.data.data
                }));
            })
            .catch(err => {
                this.setState(() => ({
                    error: {
                        status: err.response.status,
                        message: err.response.data.message
                    }
                }));
            });
    }

    componentDidMount(){
        this.getLog();
    }

    render(){
        // console.log(this.state)
        const log = this.state.log;
        const error = this.state.error 
        const flag = (error !== null) ? true : false;
        let content = null;
        let notification;

        if (log === null) {
            notification = 'Fetching data, please wait..';
        }

        if (flag) {
            notification = error.message;
        }

        if (log) {
            content = 
            <div>
                <table className = 'table' >
                    <thead>
                        <tr>
                        <th scope='col'>ID</th> 
                        <th scope='col'>Name</th>
                        <th scope='col'>Local Time</th>
                        <th scope='col'>Latitude</th>
                        <th scope='col'>Longitude</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Speed</th>
                        <th scope='col'>Direction</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr>
                            <td scope="row">{log.vehicle_id}</td>
                            <td>{log.vehicle_name}</td>
                            <td>{log.local_time}</td>
                            <td>{log.lat}</td>
                            <td>{log.lng}</td>
                            <td>{log.address}</td>
                            <td>{log.speed}</td>
                            <td>{log.direction}</td>
                        </tr>  
                    </tbody> 
                </table>

                <BingMapsReact
                    bingMapsKey="AqrpK_b1lckZjNLrnOsEpLjuqsD0W43B9KnoHzITuX1U65qtzs6t_ermmJ38QnlK"
                    height="500px"
                    mapOptions={{
                        navigationBarMode: "square",
                    }}
                    pushPins={[
                        {
                            center: {
                                latitude: log.lat,
                                longitude: log.lng,
                            },
                            options: {
                                title: "vehicle location",
                            },
                        }
                    ]}
                    viewOptions={{ center: { latitude: log.lat, longitude: log.lng } }}
                />

            </div>;
        }

        return (
            <Layout>
                <h2 className="text-center mt-5 mb-3">Last Info</h2>
                <div><Link to="/" className="btn btn-primary btn-sm">Go back</Link></div>
                <div>{ notification }</div>
                { content }
            </Layout>
        );
    }
}

export default withRouter(Info);
