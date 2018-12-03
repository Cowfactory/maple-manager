import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickRaidList.module.css';
import zakumImg from '../../img/jobicons/all.png';
import horntailImg from '../../img/jobicons/all.png';
import customImg from '../../img/jobicons/all.png';

class QuickRaidList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joe: "joe"
        }
    }



    render() {
        return (
            <div className={styles.QuickRaidList}>
                <div className={styles.listSegment}>
                    <img src={horntailImg}></img>
                    <p>Horntail</p>
                    <Link to="/">New Run Btn</Link>
                </div>
                <div className={styles.listSegment}>
                    <img src={zakumImg}></img>
                    <p>Zakum</p>
                    <Link to="/">New Run Btn</Link>
                </div>
                <div className={styles.listSegment}>
                    <img src={customImg}></img>
                    <p>Custom Run</p>
                    <Link to="/">New Run Btn</Link>
                </div>
            </div>
        )
    }
}

export default QuickRaidList;