import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import withRouter from '../withRouter';
  
class Log extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            logs: null,
            loading:true
        };
    }
  
    async getLogs(){
        const res = await axios.get(`/api/v1/agilogs/${this.state.id}/logCount?latest=true`);
        this.setState({loading:false, logs: res.data.data});
    }

    componentDidMount(){
        this.getLogs();
    }

    render(){
        if (this.state.logs === null) {
            return (
                <Layout>
                    <h2 className="text-center mt-5 mb-3">Log Count</h2>
                    <div>Fetching data, please wait..</div>
                </Layout>
            );
        } else if (this.state.logs.length === 0) {
            return (
                <Layout>
                    <h2 className="text-center mt-5 mb-3">Log Count</h2>
                    <div>There is not data found on this vehicle</div>
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <h2 className="text-center mt-5 mb-3">Log Count</h2>
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
                </Layout>
            );
        }
    }
}

export default withRouter(Log);
