import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
  
export default class Log extends Component{

    constructor(props){
        super(props);
        this.state = {
            logs: [],
            loading:true
        };
    }
  
    async getLogs(){
      const res = await axios.get('/api/v1/agilogs/115/logCount?latest=true');
      this.setState({loading:false, logs: res.data.data});
    };

    componentDidMount(){
        this.getLogs();
    }

    render(){
        return (
            <Layout>
                <div className="container">
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
                                        <td>{value.name}</td>
                                        <td>{value.localTime}</td>
                                        <td>{value.count}</td>
                                    </tr>  
                                )
                            }
                        </tbody> 
                    </table>
                </div>
            </Layout>
        )
    }
}
