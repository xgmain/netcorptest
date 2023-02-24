import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import withRouter from '../withRouter';
import { Link } from "react-router-dom";
  
class Log extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            logs: null,
            loading:true,
            error: null
        };
    }
  
    async getLogs(){
        await axios.get(`/api/v1/agilogs/${this.state.id}/logCount?latest=true`)
            .then( res => {
                this.setState(() => ({
                    loading:false, 
                    logs: res.data.data
                }));
            })
            .catch( err => {
                this.setState(() => ({
                    error: {
                        status: err.response.status,
                        message: err.response.data.message
                    }
                }));
            })
    }

    componentDidMount(){
        this.getLogs();
    }

    render(){
        // console.log(this.state)
        const logs = this.state.logs;
        const error = this.state.error 
        const flag = (error !== null) ? true : false;
        let content = null;
        let notification;

        if (logs === null) {
            notification = 'Fetching data, please wait..';
        }

        if (flag) {
            notification = error.message;
        }

        if (logs) {
            content = 
            <div>
                <table className = 'table' >
                    <thead>
                        <tr>
                        <th scope='col'>ID</th> 
                        <th scope='col'>Name</th>
                        <th scope='col'>Year-Mon-Day</th>
                        <th scope='col'>Count</th>    
                        </tr>
                    </thead>
                
                    <tbody>
                        {
                            this.state.logs.map((value, index) =>
                                <tr key={index}>
                                    <td scope="row">{value.id}</td>
                                    <td>{value.vehicle_name}</td>
                                    <td>{value.year}-{value.month}-{value.day}</td>
                                    <td>{value.count}</td>
                                </tr>  
                            )
                        }
                    </tbody> 
                </table>
            </div>;
        }

        return (
            <Layout>
                <h2 className="text-center mt-5 mb-3">Log Count</h2>
                <div><Link to="/" className="btn btn-primary btn-sm">Go back</Link></div>
                <div>{ notification }</div>
                { content }
            </Layout>
        );
        
    }
}

export default withRouter(Log);
