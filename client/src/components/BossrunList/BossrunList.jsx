import React, { Component } from 'react';
import axios from 'axios';
import styles from './BossrunList.module.css';


class BossrunList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bossruns: []
        }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.charIds) !== JSON.stringify(prevProps.charIds)) {
            axios.request(`/api/bossruns`, {
                method: 'get',
                params: { charIds: this.props.charIds }
            })
                .then(response => {
                    let bossruns = response.data.bossruns;
                    this.setState({ bossruns })
                })
                .catch(err => { console.log(err) })
        }
    }

    render() {
        console.log(this.state.bossruns)
        let list = (this.state.bossruns.length) ?
            <>
                {this.state.bossruns.map((run, idx) => (
                    <div key={idx}>
                        {run.boss} | {run.date} | organizer
                    </div>
                ))
                }
            </>
            : <></>
        return (
            <div className={styles.BossrunList}>
                {list}
            </div>
        )
    }
}

export default BossrunList;